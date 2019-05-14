import QRCode from '../utils/qrcode';
import BaseElement from './BaseElement';

export default class QRCodeElement extends BaseElement {
  type = 'qrcode';
  /**
   * 需要绘制的内容
   */
  content: string = '';

  /**
   * 前景色
   */
  color: string = '#fff';

  constructor() {
    super();
  }

  draw(ctx: wxNS.CanvasContext) {
    ctx.save();
    super.draw(ctx);
    const { left, top, width, height } = this;
    const { color, backgroundColor } = this;
    
    QRCode.draw(this.content, ctx, left, top, width, height, color, backgroundColor);
    ctx.restore();
  }
}
