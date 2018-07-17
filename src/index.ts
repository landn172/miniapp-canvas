import { BaseElement, ImageElement, RectElement, TextElement } from './elements';

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

export default class MiniappCanvas {
  elements: BaseElement[];
  ctx: wx.CanvasContext;
  constructor(id = 'default') {
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
  }

  initElement(Element: any, config: IDefineConfig) {
    const element = new Element();
    element.loadAttr(config);
    this.elements.push(element);
  }

  preload() {
    const promises = this.elements.filter(element => element instanceof ImageElement).map((element: BaseElement) => element.preload());

    return Promise.all(promises);
  }

  draw() {
    const { ctx } = this;
    this.elements.forEach(element => {
      element.draw(ctx);
    });
    ctx.draw()
  }
}

interface IDefineConfig {
  type: keyof (ITypeMap);
}
