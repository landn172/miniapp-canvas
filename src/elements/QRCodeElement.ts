import QRCode from '../utils/qrcode';
import BaseElement from './BaseElement';

export default class QRCodeElement extends BaseElement {
  type = 'qrcode';
  dWidth: number;
  dHeight: number;
  content: string = '';

  constructor() {
    super();
    this.dWidth = this.width;
    this.dHeight = this.height;
  }

  draw(ctx: wx.CanvasContext) {
    const { left, top, width, height } = this;
    ctx.save();
    QRCode.draw(this.content, ctx, left, top, width, height, '#fff', '#000');
    ctx.restore();
  }
}
