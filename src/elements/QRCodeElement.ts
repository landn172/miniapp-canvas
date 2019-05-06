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

  /**
   * 背景色
   *
   * @type {string}
   * @memberof QRCodeElement
   */
  bgColor: string = '#000';

  constructor() {
    super();
  }

  protected draw(ctx: wxNS.CanvasContext) {
    const { left, top, width, height } = this;
    const { color, bgColor } = this;
    ctx.save();
    QRCode.draw(this.content, ctx, left, top, width, height, color, bgColor);
    ctx.restore();
  }
}
