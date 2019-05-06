import { BaseElement, ImageElement, IType2Element, ITypeMap, QRCodeElement, RectElement, TextElement, TypeKey } from './elements';
import { promisify } from './utils';
import EventBus from './utils/eventBus';
import Task, { TimeoutTask } from './utils/task';

const typeToElement = {
  image: ImageElement,
  rect: RectElement,
  text: TextElement,
  qrcode: QRCodeElement
};

/**
 * 创建元素
 */
export function createElement<T extends TypeKey>(
  config: {
    type: T;
  } & ITypeMap[T],
  unit = 'px'
): IType2Element[T] {
  const type = config.type as T;
  const Element = typeToElement[type];
  const element: BaseElement = new Element();
  element.loadAttr(config, unit);
  return element as any;
}

/**
 * miniapp-canvas
 *
 * @export
 * @class MiniappCanvas
 * @example
 ```ts
  const mc = new MiniappCanvas(canvasId)
  mc.loadConfig([borderRect, nameText, avatarImage, locationText, homePage]).then(() => {
    canvas.draw()
  })
 ```
 */
export default class MiniappCanvas extends EventBus {
  private elements: BaseElement[];
  private ctx: wxNS.CanvasContext;
  private pedding = false;

  /**
   * loadConfig后触发
   */
  private task = new Task();

  constructor(private id = 'default', public unit = 'px') {
    super();
    this.elements = [];
    this.ctx = wx.createCanvasContext(id);
  }

  /**
   * 加载json配置文件
   * @param {Array} config
   */
  async loadConfig<T extends TypeKey>(
    configs: Array<
      {
        type: T;
      } & ITypeMap[T]
    >
  ) {
    if (!Array.isArray(configs)) {
      return;
    }

    const elements = configs.map(c => {
      const element = createElement(c as any, this.unit);
      return element as any;
    });

    this.loadElements(elements);
  }

  /**
   * 加载元素
   */
  async loadElements(elements: BaseElement[]) {
    this.elements.push(...elements);

    await this.start();
  }

  /**
   * loadConfig or loadElements 后
   * 开始加载
   */
  private async start() {
    await this.preload();

    this.runTasks();
  }

  /**
   * 清空加载的元素
   *
   * @memberof MiniappCanvas
   */
  clear() {
    this.elements.length = 0;
    this.task.clear();
  }

  /**
   * 预加载资源
   *
   * @private
   * @returns Promise
   * @memberof MiniappCanvas
   * @fires beforePreload,preloaded
   */
  private preload() {
    this.pedding = true;
    this.emit('beforePreload');
    const promises = this.elements.map((element: BaseElement) =>
      element.preload()
    );

    return Promise.all(promises).then(() => {
      this.pedding = false;
      this.emit('preloaded');
    });
  }

  /**
   * 开始绘制canvas
   *
   * @memberof MiniappCanvas
   * @fires beforeDraw,drawed
   */
  async draw() {
    if (this.pedding) {
      const peddingPromise = new Promise(resolve => this.task.addTask(resolve));
      const reDrawPromise = new Promise(resolve =>
        this.once('preloaded', resolve)
      );
      return Promise.all([peddingPromise, reDrawPromise]).then(
        this.draw.bind(this)
      );
    }

    const { ctx } = this;

    this.emit('beforeDraw');

    for (const element of this.elements) {
      element.draw(ctx);
    }

    await TimeoutTask(
      new Promise(resolve => {
        ctx.draw(false, resolve);
      }),
      3000
    );

    // 微信bug导致导出图片错乱，需要延迟触发完成事件
    setTimeout(() => this.emit('drawed'), 100);
  }

  /**
   * 保存canvas截图
   *
   * @memberof MiniappCanvas
   * @fires beforeSaveImage,savedImage
   */
  async saveImage() {
    if (this.pedding) {
      const peddingPromise = new Promise(resolve => this.task.addTask(resolve));
      const waitDrawPromise = new Promise(resolve =>
        this.once('drawed', resolve)
      );
      return Promise.all([peddingPromise, waitDrawPromise]).then(
        this.saveImage.bind(this)
      );
    }

    this.emit('beforeSaveImage');

    let tempFilePath = '';

    try {
      const res = await promisify<{ tempFilePath: string }>(
        wx.canvasToTempFilePath,
        {
          canvasId: this.id
        }
      );

      tempFilePath = res.tempFilePath;
    } catch (error) {
      wx.showToast({
        title: '生成图片失败'
      });
    }

    wx.hideLoading();

    this.emit('savedImage');

    return tempFilePath;
  }

  private runTasks() {
    this.task.runTask();
  }
}
