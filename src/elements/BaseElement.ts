import { rpx2px } from '../utils';
import { deprecated } from '../utils/decorators';
import EventBus from '../utils/eventBus';
import findColor from '../utils/findColor';
import { getUUID } from '../utils/getUUID';
import Task from '../utils/task';

const getSizeAndUnitReg = /([\d\.]+)(px|rpx|\s)/i;

/**
 * 基础元素
 *
 * @export
 * @class BaseElement
 */
export default class BaseElement extends EventBus {
  type: string = 'base';
  /** canvas ctx  */
  ctx: wxNS.CanvasContext;
  /**
   * 元素id
   */
  private id: number;

  /**
   * 元素宽
   * @default 0
   */
  width = 0;
  /**
   * 元素高
   * @default 0
   */
  height = 0;
  /**
   * 元素距离父元素距离
   * @default 0
   */
  top = 0;
  /**
   * 元素距离父元素左边距离
   * @default 0
   */
  left = 0;
  /**
   * 层级
   * @default 0
   */
  zIndex = 0;
  /**
   * 透明度
   * @default 1
   */
  opacity = 1;
  /**
   * 背景颜色
   * @default ''
   */
  backgroundColor = '';

  /**
   * 背景颜色 please use backgroundColor instead
   * @deprecated
   */
  @deprecated('please use [backgroundColor] instead')
  set bgColor(value: string) {
    this.backgroundColor = value;
  }

  get bgColor() {
    return this.backgroundColor;
  }

  /**
   * 边框宽
   * @default 0
   */
  borderWidth = 0;

  /**
   * 边框颜色
   * @default ''
   */
  borderColor = '';

  /**
   * 边框样式
   * @default solid
   */
  private readonly borderStyle = '';

  /**
   * 边框半径
   * @default 0
   */
  borderRadius: number = 0;

  /**
   * 边框样式
   */
  // tslint:disable-next-line:variable-name
  private _border: string = '';
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
   * 边框样式 like css
   * @example
   *  1px solid #fff
   */
  get border() {
    return this._border;
  }

  /**
   * 阴影样式
   */
  private shadows: any[][] = [];

  // tslint:disable-next-line:variable-name
  private _boxShadow: string = '';

  /**
   * 阴影样式
   */
  get boxShadow() {
    return this._boxShadow;
  }

  /**
   * 阴影样式
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/CanvasContext.setShadow.html
   */
  set boxShadow(value: string) {
    this._boxShadow = value;
    let match;
    const shadows = [] as any[];
    const getSizeAndUnitRegGlobal = new RegExp(getSizeAndUnitReg, 'ig');

    const values = value.split(',');

    for (const v of values) {
      const shadow = [] as any[];
      const color = findColor(v);
      if (!color) {
        throw new Error('[boxShadow] 未设置颜色');
      }
      // tslint:disable-next-line:no-conditional-assignment
      while ((match = getSizeAndUnitRegGlobal.exec(v))) {
        const [, size, unit] = match;
        if (unit === 'rpx') {
          shadow.push(Number(rpx2px(size)));
        } else {
          shadow.push(Number(size));
        }
      }
      // canvas 不支持css的 阴影扩散半径
      shadow[3] = color;
      shadow.length = 4;

      shadows.push(shadow);
    }

    this.shadows = shadows;
  }

  protected task = new Task();

  constructor() {
    super();
    this.id = getUUID();
  }

  [key: string]: any;
  /**
   * 加载属性配置
   * @example
   *  {
   *    width: 100,
   *    height: 200
   * }
   * @param {object} attrs
   * @param {string} unit 默认px
   */
  loadAttr(attrs: any, unit = 'px') {
    const convert = unit === 'rpx' ? rpx2px : (rpx: any) => rpx;
    if (typeof attrs === 'object') {
      Object.keys(attrs).forEach(key => {
        if (typeof this[key] !== 'undefined') {
          this[key] = attrs[key];
        }
      });
    }

    Object.keys(this).forEach(key => {
      if (typeof this[key] !== 'undefined') {
        this[key] = convert(this[key]);
      }
    });
  }

  getAttrs() {
    const attrs: any = {};
    Object.keys(this).forEach(key => (attrs[key] = this[key]));
    return attrs;
  }

  preload(): Promise<any> {
    return Promise.resolve().then(() => 'preloaded');
  }

  draw(ctx: wxNS.CanvasContext) {
    this.drawShadow(ctx);
    this.drawPath(ctx);
    this.drawBorder(ctx);
    this.drawBackground(ctx);
  }

  /**
   * 绘制路径
   */
  private drawPath(ctx: wxNS.CanvasContext, clip = true) {
    ctx.beginPath();
    const { borderRadius, width, height, top, left } = this;
    if (borderRadius) {
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

      if (this.type === 'image' && clip) {
        // ctx.setGlobalAlpha(0);
        ctx.clip();
        // ctx.setGlobalAlpha(1);
      }
    } else {
      ctx.moveTo(left, top);
      // 上
      ctx.lineTo(left + width, top);
      // 左
      ctx.lineTo(left + width, top + height);
      // 下
      ctx.lineTo(left, top + height);
      // 右
      ctx.lineTo(left, top);
    }

    ctx.closePath();
  }

  /**
   * 绘制边框
   * Border color (no border radius):
   */
  private drawBorder(ctx: wxNS.CanvasContext) {
    // Border color (no border radius):
    if (this.borderColor) {
      ctx.lineWidth = this.borderWidth || 1;
      ctx.strokeStyle = this.borderColor;
      ctx.strokeRect(this.top, this.left, this.width, this.height);
    }
  }

  /**
   * 绘制阴影
   */
  private drawShadow(ctx: wxNS.CanvasContext) {
    if (!this.shadows || this.shadows.length <= 0) {
      return;
    }
    const shadow = this.shadows[0];
    const [
      shadowOffsetX = 0,
      shadowOffsetY = 0,
      shadowBlur = 0,
      shadowColor
    ] = shadow;
    ctx.save();
    const { width, height, top, left } = this;
    const deltaTop = height + top;
    const deltaLeft = width + left;
    console.log({ width, height, top, left }, { deltaTop, deltaLeft });
    // 设置偏移
    this.top = -deltaTop;
    this.left = -deltaLeft;
    this.drawPath(ctx, false);
    // 还原
    this.top = top;
    this.left = left;

    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    ctx.shadowOffsetX = shadowOffsetX + deltaLeft;
    ctx.shadowOffsetY = shadowOffsetY + deltaTop;
    // only use fill(),fillRect(),strokeRect() can draw shadow
    ctx.fillStyle = shadowColor;
    ctx.fill();
    ctx.restore();
  }

  private drawBackground(ctx: wxNS.CanvasContext) {
    if (!this.backgroundColor) {
      return;
    }
    ctx.fillStyle = this.backgroundColor;
    ctx.fill();
  }
}
