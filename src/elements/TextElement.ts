import BaseElement from './BaseElement';

export default class TextElement extends BaseElement {
  type = 'text';
  text: string = '';
  color: string = '#000';
  fontSize: number = 12;
  textAlign: wx.TextAlignOptions = 'left';
  textBaseline: wx.TextBaseLineOptions = 'top';
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
