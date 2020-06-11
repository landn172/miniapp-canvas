import { getAttrs } from 'platforms/index';
import { property } from '../utils/lit-plugin';
import { rpx2px } from '../utils';
import { deprecated } from '../utils/decorators';
import EventBus from '../utils/eventBus';
import { getUUID } from '../utils/getUUID';
import { parseBorder } from '../utils/parseBorder';
import { parseShadow } from '../utils/parseShadow';
import Task from '../utils/task';

/**
 * 基础元素
 *
 * @export
 * @class BaseElement
 * @attr width - 元素宽
 * @attr height
 * @attr top
 * @attr left
 * @attr zIndex
 * @attr opacity
 * @attr backgroundColor
 * @attr borderWidth
 * @attr borderColor
 * @attr borderRadius
 * @attr {solid|} borderStyle
 * @attr border
 * @attr boxShadow
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
   * 是否使用修复的layout
   */
  private isFixedLayout = false;

  /**
   * 元素宽
   * @default 0
   */
  @property({ type: Number })
  width = 0;
  /**
   * 元素高
   * @default 0
   */
  @property({ type: Number })
  height = 0;
  /**
   * 元素距离父元素距离
   * @default 0
   */
  @property({ type: Number })
  top = 0;
  /**
   * 元素距离父元素左边距离
   * @default 0
   */
  @property({ type: Number })
  left = 0;
  /**
   * 层级
   * @default 0
   */
  @property({ type: Number })
  zIndex = 0;
  /**
   * 透明度
   * @default 1
   */
  @property({ type: Number })
  opacity = 1;
  /**
   * 背景颜色
   * @default ''
   */
  @property({ type: String })
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
  @property({ type: Number })
  borderWidth = 0;

  /**
   * 边框颜色
   * @default '#000'
   */
  @property({ type: String })
  borderColor = '#000';

  /**
   * 边框样式
   * @default ''
   */
  @property({ type: String })
  borderStyle = '';

  /**
   * 边框半径
   * @default 0
   */
  @property({ type: Number })
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
    const result = parseBorder(value);
    const { borderColor, borderWidth, borderStyle } = result;
    if (borderColor) {
      this.borderColor = borderColor;
    }
    this.borderWidth = borderWidth;

    if (borderStyle) {
      this.borderStyle = borderStyle;
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
  private get shadows(): any[][] {
    return parseShadow(this.boxShadow || '');
  }

  /**
   * 阴影样式
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/CanvasContext.setShadow.html
   */
  boxShadow = '';

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
        const type = typeof this[key];
        let value = attrs[key];
        switch (type) {
          case 'string':
            value = `${value}`;
            break;
          case 'number':
            value = Number(value);
            break;
          default:
            break;
        }
        this[key] = value;
      });
    }

    // 批量统一转换单位
    Object.keys(this).forEach(key => {
      if (typeof this[key] === 'string') {
        this[key] = convert(this[key]);
      }
    });
  }

  getAttrs() {
    return getAttrs(this);
  }

  preload(): Promise<any> {
    return Promise.resolve().then(() => 'preloaded');
  }

  draw(ctx: wxNS.CanvasContext) {
    this.drawShadow(ctx);
    this.drawBorder(ctx);
    this.drawPath(ctx, true, () => {
      return this.getBackgroundLayout();
    });
    this.drawBackground(ctx);
  }

  /**
   * 绘制路径
   */
  private drawPath(
    ctx: wxNS.CanvasContext,
    clip = true,
    getLayout = this.getLayout.bind(this)
  ) {
    ctx.beginPath();
    const borderRadius = this.borderRadius;
    const { width, height, top, left } = getLayout();
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
    if (this.borderStyle) {
      const borderWidth = Math.max(this.borderWidth || 0, 0);
      if (borderWidth <= 0) {
        return;
      }
      ctx.save();
      this.drawPath(ctx, false);
      ctx.fillStyle = this.borderColor || '#000';
      ctx.fill();
      ctx.restore();

      // 裁剪绘制区域
      ctx.save();
      this.drawPath(ctx, false, () => {
        return this.getBackgroundLayout();
      });
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fill();
      ctx.restore();
    }
  }

  /**
   * 绘制阴影
   */
  private drawShadow(ctx: wxNS.CanvasContext) {
    const shadows = this.shadows;
    if (!shadows || shadows.length <= 0) {
      return;
    }
    const shadow = shadows[0];
    const [
      shadowOffsetX = 0,
      shadowOffsetY = 0,
      shadowBlur = 0,
      shadowColor
    ] = shadow;
    // 绘制阴影
    ctx.save();
    const { width, height, top, left } = this;
    const deltaTop = height + top;
    const deltaLeft = width + left;
    // 设置偏移
    this.top = -height;
    this.left = -width;
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

    // 裁剪绘制区域
    ctx.save();
    this.drawPath(ctx, false);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fill();
    ctx.restore();
  }

  private drawBackground(ctx: wxNS.CanvasContext) {
    if (!this.backgroundColor) {
      return;
    }
    ctx.save();

    ctx.fillStyle = this.backgroundColor;
    ctx.fill();
    ctx.restore();
  }

  /**
   * 获取背景layout
   */
  protected getBackgroundLayout() {
    let borderWidth = Math.max(this.borderWidth || 0, 0);
    if (!this.borderStyle) {
      borderWidth = 0;
    }
    const { width, height, top, left } = this;
    return {
      width: width - borderWidth * 2,
      height: height - borderWidth * 2,
      top: top + borderWidth,
      left: left + borderWidth
    };
  }

  /**
   * 获取布局
   */
  private getLayout() {
    const { width, height, top, left } = this;

    return { width, height, top, left };
  }
}
