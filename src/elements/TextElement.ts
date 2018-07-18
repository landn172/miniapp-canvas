import BaseElement from './BaseElement';

/**
 * 文本元素
 *
 * @export
 * @class TextElement
 * @extends {BaseElement}
 * @property {string} text 文字
 * @property {string} color 字体颜色
 * @property {number} fontSize 字体大小
 * @property {wx.TextAlignOptions} textAlign 文字对齐方式
 * @property {wx.TextBaseLineOptions} textBaseline 文字基线
 */
export default class TextElement extends BaseElement {
  type = 'text';
  /**
   * 文字
   */
  text: string = '';
  /**
   * 字体颜色
   */
  color: string = '#000';
  /**
   * 字体大小
   */
  fontSize: number = 12;
  /**
   * 文字对齐方式
   */
  textAlign: wx.TextAlignOptions = 'left';
  /**
   * 文字基线
   */
  textBaseline: wx.TextBaseLineOptions = 'top';

  /**
   * Creates an instance of TextElement.
   * @memberof TextElement
   */
  constructor() {
    super();
  }

  draw(ctx: wx.CanvasContext) {
    ctx.save();
    ctx.setFillStyle(this.color);
    ctx.setFontSize(this.fontSize);
    ctx.setTextBaseline(this.textBaseline);
    ctx.setTextAlign(this.textAlign);
    ctx.fillText(this.text, this.top, this.left);
    ctx.restore();
  }
}
