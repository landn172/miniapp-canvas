import * as htm from 'htm';

function h(type: string, props: any, ...children: any[]) {
  return { type, props, children };
}

export interface IHtmlResult {
  /**
   * html 标签
   * @example view
   */
  type: string;
  /**
   * html props
   * @expamle { id: 'my-id', style: 'color: red;'}
   */
  props: {
    [prop: string]: any;
  } | null;
  /**
   * 子元素
   */
  children: Array<string | IHtmlResult>;
}

/**
 * htm模板字符
 * @see https://github.com/developit/htm
 * @see https://es6.ruanyifeng.com/#docs/string#%E6%A0%87%E7%AD%BE%E6%A8%A1%E6%9D%BF
 */
export const html = (htm.default || htm).bind(h) as (
  ...args: any
) => IHtmlResult | IHtmlResult[];

/**
 * 仿造ES6 string tag
 */
export function makeTemplateObject(cooked: any, raw: any) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, 'raw', { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
