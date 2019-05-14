import { deprecated } from '../utils/decorators';
import BaseElement from './BaseElement';

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
   * 是否实心
   */
  @deprecated('please use [backgroundColor] instead')
  set solid(value: boolean) {}

  /**
   * Creates an instance of RectElement.
   * @memberof RectElement
   */
  constructor() {
    super();
  }

  draw(ctx: wxNS.CanvasContext) {
    ctx.save();
    super.draw(ctx);
    ctx.restore();
  }
}
