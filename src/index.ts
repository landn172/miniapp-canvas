import {
  BaseElement,
  ImageElement,
  RectElement,
  TextElement
} from './elements';
import { promisify } from './utils';
import Task from './utils/task';

/**
 * 类型映射
 */
interface ITypeMap {
  image: ImageElement;
  rect: RectElement;
  text: TextElement;
}

const typeMap = {
  image: ImageElement,
  rect: RectElement,
  text: TextElement
};

/**
 * miniapp-canvas
 *
 * @export
 * @class MiniappCanvas
 */
export default class MiniappCanvas {
  private elements: BaseElement[];
  ctx: wx.CanvasContext;
  pedding = false;

  private task = new Task();

  constructor(private id = 'default', public unit = 'px') {
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
   */
  private preload() {
    this.pedding = true;

    const promises = this.elements
      .filter(element => element instanceof ImageElement)
      .map((element: BaseElement) => element.preload());

    return Promise.all(promises);
  }

  /**
   * 开始绘制canvas
   *
   * @memberof MiniappCanvas
   */
  draw() {
    if (this.pedding) {
      this.task.addTask(this.draw.bind(this));
      return;
    }

    const { ctx } = this;
    this.elements.forEach(element => {
      element.draw(ctx);
    });
    ctx.draw();
  }

  /**
   * 保存canvas截图
   *
   * @memberof MiniappCanvas
   */
  async saveImage() {
    wx.showLoading({
      title: '正在生成图片中'
    });

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

    return tempFilePath;
  }

  private runTasks() {
    this.task.runTask();
  }
}

interface IDefineConfig {
  type: keyof (ITypeMap);
}
