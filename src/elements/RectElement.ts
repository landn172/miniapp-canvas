import { deprecated } from '../utils/decorators';
import { customElement } from '../utils/lit-plugin';
import BaseElement from './BaseElement';

/**
 * 矩形元素
 *
 * @export
 * @class RectElement
 * @extends {BaseElement}
 */
@customElement('m-rect')
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

declare global {
  // tslint:disable-next-line: interface-name
  interface HTMLElementTagNameMap {
    'm-rect': RectElement;
  }
}
