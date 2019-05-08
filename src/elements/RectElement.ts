import findColor from '../utils/findColor';
import BaseElement from './BaseElement';

const getSizeAndUnitReg = /([\d\.]+)(px|rpx)/i;

/**
 * 矩形元素
 *
 * @export
 * @class RectElement
 * @extends {BaseElement}
 * @property {string} bgColor 背景颜色
 * @property {string} border 边框样式 eg. 1px #fff
 * @property {boolean} solid 是否实心
 * @property {string} boxShadow 阴影样式
 * @property {number} borderWidth 边框宽
 * @property {string} borderColor 边框颜色
 * @property {number} borderRadius 边框半径
 */
export default class RectElement extends BaseElement {
  type = 'rect';
  /**
   * 背景颜色
   */
  bgColor: string = '#ffffff';
  /**
   * 边框样式
   */
  // tslint:disable-next-line:variable-name
  private _border: string = '';

  /**
   * 边框样式 like css
   * @example
   *  1px solid #fff
   */
  get border() {
    return this._border;
  }

  /**
   * 边框样式
   */
  set border(value: string) {
    this._border = value;
    const borderColor = findColor(value);
    if (borderColor) {
      this.borderColor = borderColor;
    }

    const borderSizeMatch = value.match(getSizeAndUnitReg);
    if (borderSizeMatch) {
      const [size] = borderSizeMatch;
      this.borderWidth = Number(size);
    }
  }

  /**
   * 是否实心
   */
  solid: boolean = true;

  /**
   * 边框宽
   */
  borderWidth = 0;

  /**
   * 边框颜色
   */
  borderColor = '';

  /**
   * 边框样式
   */
  private readonly borderStyle = 'solid';

  /**
   * 边框半径
   */
  borderRadius: number = 0;

  /**
   * 阴影样式
   */
  private shadow: any[] = null;

  // tslint:disable-next-line:variable-name
  private _boxShadow: string = '';

  get boxShadow() {
    return this._boxShadow;
  }

  /**
   * 阴影样式
   */
  set boxShadow(value: string) {
    this._boxShadow = value;
    let match;
    const shadow = [];
    const getSizeAndUnitRegGlobal = new RegExp(getSizeAndUnitReg, 'ig');
    // tslint:disable-next-line:no-conditional-assignment
    while ((match = getSizeAndUnitRegGlobal.exec(value))) {
      const [, size, unit] = match;
      shadow.push(~~size);
    }

    const color = findColor(value);
    if (!color) {
      throw new Error('[boxShadow] 未设置颜色');
    }
    shadow[3] = color;

    shadow.length = 4;

    this.shadow = shadow;
  }

  /**
   * Creates an instance of RectElement.
   * @memberof RectElement
   */
  constructor() {
    super();
  }

  protected setStyle(ctx: wxNS.CanvasContext) {
    if (!this.solid) {
      this.bgColor = '';
    }

    const fillStyle = this.bgColor || `rgba(255, 255, 255, 0)`;
    ctx.fillStyle = fillStyle;
    if (this.borderColor) {
      ctx.setStrokeStyle(this.borderColor);
    }

    if (this.borderWidth) {
      ctx.setLineWidth(this.borderWidth);
    }

    this.setShadow(ctx);
  }

  protected draw(ctx: wxNS.CanvasContext) {
    ctx.save();
    ctx.beginPath();
    this.setStyle(ctx);
    this.drawWithBorder(ctx);
    ctx.closePath();
    if (!this.solid) {
      ctx.stroke();
    }
    ctx.fill();

    ctx.restore();
  }

  /**
   * 设置阴影
   *
   * @private
   * @param {wxNS.CanvasContext} ctx
   * @returns {boolean}
   * @memberof RectElement
   */
  private setShadow(ctx: wxNS.CanvasContext): boolean {
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
   * @param {wxNS.CanvasContext} ctx
   * @memberof RectElement
   */
  protected drawWithBorder(ctx: wxNS.CanvasContext) {
    const { borderRadius, width, height, top, left } = this;

    if (borderRadius) {
      this.pathBorderRadius(ctx);
    } else {
      ctx.rect(left, top, width, height);
    }
  }

  /**
   * 绘制边框路径
   *
   * @private
   * @param {wxNS.CanvasContext} ctx
   * @memberof RectElement
   */
  protected pathBorderRadius(ctx: wxNS.CanvasContext) {
    const { borderRadius, width, height, top, left } = this;

    const halfW = width / 2;
    const halfH = height / 2;
    // 半径最大值
    const r = Math.min(borderRadius, halfW, halfH);

    // 圆形
    if (r === halfW && halfH === halfW) {
      ctx.arc(left + r, top + r, r, 0, 2 * Math.PI);
    } else {
      // 左上
      ctx.arc(left + r, top + r, r, 1 * Math.PI, 1.5 * Math.PI);
      ctx.lineTo(left + width - r, top);
      // 右上
      ctx.arc(left + width - r, top + r, r, 1.5 * Math.PI, 2 * Math.PI);
      ctx.lineTo(left + width, top + height - r);
      // 右下
      ctx.arc(left + width - r, top + height - r, r, 0, 0.5 * Math.PI);
      ctx.lineTo(left + r, top + height);
      // 左上
      ctx.arc(left + r, top + height - r, r, 0.5 * Math.PI, 1 * Math.PI);
    }
  }
}
