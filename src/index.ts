import {
  BaseElement,
  ImageElement,
  QRCodeElement,
  RectElement,
  TextElement
} from './elements';
import { promisify } from './utils';
import EventBus from './utils/eventBus';
import Task, { TimeoutTask } from './utils/task';

/**
 * 类型映射
 */
interface ITypeMap {
  image: ImageElement;
  rect: RectElement;
  text: TextElement;
  qrcode: QRCodeElement
}

const typeMap = {
  image: ImageElement,
  rect: RectElement,
  text: TextElement,
  qrcode: QRCodeElement
};

/**
 * miniapp-canvas
 *
 * @export
 * @class MiniappCanvas
 * @
 */
export default class MiniappCanvas extends EventBus {
  private elements: BaseElement[];
  ctx: wx.CanvasContext;
  pedding = false;

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
  async loadConfig(configs: IDefineConfig[]) {
    if (!Array.isArray(configs)) {
      return;
    }

    configs.forEach(c => {
      const { type } = c;
      const Element = typeMap[type];
      if (!Element) {
        return;
      }
      this.initElement(Element, c);
    });

    await this.preload();
    this.pedding = false;
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

  initElement(Element: any, config: IDefineConfig) {
    const element = new Element();
    element.loadAttr(config, this.unit);
    this.elements.push(element);
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

    return Promise.all(promises).then(() => this.emit('preloaded'));
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
        this.once('drawed', resolve)
      );
      Promise.all([peddingPromise, reDrawPromise]).then(this.draw.bind(this));
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

interface IDefineConfig {
  type: keyof (ITypeMap);
}
