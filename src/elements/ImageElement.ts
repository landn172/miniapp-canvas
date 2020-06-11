import * as api from 'platforms/index';
import { deprecated } from '../utils/decorators';
import { customElement, property } from '../utils/lit-plugin';
import BaseElement from './BaseElement';

const httpSrc = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/;

/**
 * 图片元素
 *
 * @export
 * @class ImageElement
 * @attr src
 * @extends {BaseElement}
 * @property {boolean} circle 显示圆形
 */
@customElement('m-image')
export default class ImageElement extends BaseElement {
  type = 'image';
  /**
   * 显示圆形
   *
   * @type {boolean}
   * @memberof ImageElement
   */
  @deprecated('please use [borderRadius] instead')
  set circle(v: boolean) {
    if (v === true) {
      this.borderRadius = Math.max(this.width, this.height) / 2;
    }
  }

  get circle() {
    return this.borderRadius > 0;
  }

  /**
   * 图片路径
   *    本地路径
   *    在线路径
   */
  @deprecated('please use [src] instead')
  set image(value: string) {
    this.src = value;
  }

  get image() {
    return this.src;
  }

  /**
   * 图片路径
   *    本地路径
   *    在线路径
   */
  @property({ type: String, value: '' })
  src!: string;

  /**
   * Creates an instance of ImageElement.
   * @memberof ImageElement
   */
  constructor() {
    super();
  }

  async preload() {
    const url = this.src;
    if (!url) {
      return;
    }

    // 在线资源
    if (httpSrc.test(url)) {
      try {
        const path = await downloadImage(url);
        if (path) {
          this.src = path;
        }
        return path;
      } catch (error) {
        console.log(error);
      }

      return url;
    }

    return url;
  }

  async draw(ctx: wxNS.CanvasContext) {
    ctx.save();

    super.draw(ctx);
    const { width, height, top, left } = this.getBackgroundLayout();

    if (this.backgroundColor) {
      ctx.save();
      ctx.fillStyle = this.backgroundColor;
      ctx.fillRect(top, left, width, height);
      ctx.restore();
    }

    if (!this.src) {
      return;
    }

    // @ts-ignore
    ctx.drawImage(this.src, left, top, width, height);
    ctx.restore();
  }
}

/* 重试次数 */
const TRY_COUNT = 2;

async function downloadImage(url: string) {
  for (let i = 0; i < TRY_COUNT; i++) {
    try {
      const res = await api.getImageInfo(url);

      return res.path;
    } catch (error) {
      console.log(error);
    }
  }
}

declare global {
  // tslint:disable-next-line: interface-name
  interface HTMLElementTagNameMap {
    'm-image': ImageElement;
  }
}
