import BaseElement from './BaseElement';

/**
 * 矩形元素
 *
 * @export
 * @class RectElement
 * @extends {BaseElement}
 * @property {string} bgColor 背景颜色
 * @property {string} stroke 边框样式
 * @property {boolean} solid 是否实心
 * @property {any[]} shadow 阴影样式
 */
export default class RectElement extends BaseElement {
  type = 'rect';
  /**
   * 背景颜色
   */
  bgColor: string = '#000';
  /**
   * 边框样式
   */
  stroke: string = '#000';
  /**
   * 是否实心
   */
  solid: boolean = true;
  /**
   * 阴影样式
   */
  shadow: any[] = null;

  /**
   * Creates an instance of RectElement.
   * @memberof RectElement
   */
  constructor() {
    super();
  }

  draw(ctx: wx.CanvasContext) {
    ctx.save();
    ctx.setFillStyle(this.bgColor);
    ctx.setStrokeStyle(this.stroke);
    if (Array.isArray(this.shadow)) {
      this.drawShadow(ctx);
    }
    const drawRect = (this.solid ? ctx.fillRect : ctx.strokeRect).bind(ctx);
    drawRect(this.left, this.top, this.width, this.height);
    ctx.restore();
  }

  private drawShadow(ctx: wx.CanvasContext) {
    const [x, y, blur, color] = this.shadow;
    ctx.setShadow(x, y, blur, color);
  }
}
