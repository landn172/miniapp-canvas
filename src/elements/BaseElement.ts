import { rpx2px } from '../utils';
import EventBus from '../utils/eventBus';
import Task from '../utils/task';

/**
 * 基础元素
 *
 * @export
 * @class BaseElement
 */
export default class BaseElement extends EventBus {
  type: string = 'base';

  protected task = new Task();

  /**
   * Creates an instance of BaseElement.
   * @param {number} [width=0]
   * @param {number} [height=0]
   * @param {number} [top=0]
   * @param {number} [left=0]
   * @memberof BaseElement
   */
  constructor(
    /**
     * 元素宽
     */
    public width = 0,
    /**
     * 元素高
     */
    public height = 0,
    /**
     * 元素距离顶部距离
     */
    public top = 0,
    /**
     * 元素距离左边距离
     */
    public left = 0
  ) {
    super();
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
}
