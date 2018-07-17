import BaseElement from './BaseElement';

export default class RectElement extends BaseElement {
  type = 'rect';
  bgColor: string = '#000';
  stroke: string = '#000';
  /**
   * 是否实心
   *
   * @type {boolean}
   * @memberof RectElement
   */
  solid: boolean = true;
  /**
   * 阴影样式
   */
  shadow: any[] = null;
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
