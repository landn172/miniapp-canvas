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
   * 边框半径
   */
  borderRadius: number = 0;

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

    this.drawWithBorder(ctx);
    ctx.restore();
  }

  /**
   * 设置阴影
   *
   * @private
   * @param {wx.CanvasContext} ctx
   * @returns {boolean}
   * @memberof RectElement
   */
  private setShadow(ctx: wx.CanvasContext): boolean {
    if (Array.isArray(this.shadow) && this.shadow.length === 4) {
      const [x, y, blur, color] = this.shadow;
      ctx.setShadow(x, y, blur, color);
      return true;
    }
    return false;
  }

  /**
   * 带边框绘制
   *
   * @param {wx.CanvasContext} ctx
   * @memberof RectElement
   */
  drawWithBorder(ctx: wx.CanvasContext) {
    const { borderRadius, width, height, top, left } = this;
    this.setShadow(ctx);
    
    this.fillorStroke = this.solid ? ctx.fill : ctx.stroke

    if (borderRadius) {
      this.pathBorderRadius(ctx);
    } else {
      ctx.rect(left, top, width, height);
      this.fillorStroke.call(ctx);
    }    
  }

  /**
   * 绘制边框路径
   *
   * @private
   * @param {wx.CanvasContext} ctx
   * @memberof RectElement
   */
  pathBorderRadius(ctx: wx.CanvasContext) {
    const { borderRadius, width, height, top, left } = this;

    const halfW = width / 2;
    const halfH = height / 2;

    const translateX = left + halfW;
    const translateY = top + halfH;

    ctx.translate(translateX, translateY);

    // 半径最大值
    const r = Math.min(borderRadius, halfW, halfH);
    ctx.beginPath();
    // 左上
    ctx.arc(-halfW + r, -halfH + r, r, 1 * Math.PI, 1.5 * Math.PI);
    ctx.lineTo(halfW - r, -halfH);
    // 右上
    ctx.arc(halfW - r, -halfH + r, r, 1.5 * Math.PI, 2 * Math.PI);
    // 右下
    ctx.lineTo(halfW, halfH - r);
    // 左上
    ctx.arc(halfW - r, halfH - r, r, 0, 0.5 * Math.PI);
    ctx.lineTo(-halfW + r, halfH);
    ctx.arc(-halfW + r, halfH - r, r, 0.5 * Math.PI, 1 * Math.PI);
    ctx.closePath();
    this.fillorStroke.call(ctx);
    ctx.translate(-translateX, -translateY);
  }
}
