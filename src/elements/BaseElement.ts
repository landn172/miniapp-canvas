/**
 * 基础元素
 *
 * @export
 * @class BaseElement
 */
export default class BaseElement {
  type: string = 'base';
  /**
   * Creates an instance of BaseElement.
   * @param {number} [width=0]
   * @param {number} [height=0]
   * @param {number} [top=0]
   * @param {number} [left=0]
   * @memberof BaseElement
   */
  constructor(
    public width = 0,
    public height = 0,
    public top = 0,
    public left = 0
  ) {}

  [key: string]: any;
  /**
   * 加载属性配置
   * @example
   *  {
   *    width: 100,
   *    height: 200
   * }
   * @param {object} attrs
   */
  loadAttr(attrs: any) {
    if (typeof attrs === 'object') {
      Object.keys(attrs).forEach(key => {
        if (typeof this[key] !== 'undefined') {
          this[key] = attrs[key];
        }
      });
    }
  }

  preload() {
    return Promise.resolve();
  }

  draw(ctx: any) {
    console.log('draw', ctx);
  }
}
