import { cache, getCache, promisify } from '../utils';
import BaseElement from './BaseElement';

const httpSrc = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/;

/**
 * 图片元素
 *
 * @export
 * @class ImageElement
 * @extends {BaseElement}
 * @property {boolean} circle 显示圆形
 */
export default class ImageElement extends BaseElement {
  type = 'image';
  dWidth: number;
  dHeight: number;
  /**
   * 显示圆形
   *
   * @type {boolean}
   * @memberof ImageElement
   */
  circle: boolean = false;

  /**
   * Creates an instance of ImageElement.
   * @memberof ImageElement
   */
  constructor() {
    super();
    this.image = '';
    this.dWidth = this.width;
    this.dHeight = this.height;
  }

  async preload() {
    const url = this.image;
    if (!url) {
      return;
    }

    if (getCache(url)) {
      return getCache(url);
    }

    // 在线资源
    if (httpSrc.test(url)) {
      try {
        const res = await promisify<any>(wx.getImageInfo, {
          src: url
        });

        cache(url, res.path);
        this.image = res.path;
        return res.path;
      } catch (error) {
        console.log(error);
      }

      return url;
    }

    // 本地资源
    cache(url, url);

    return url;
  }

  draw(ctx: wx.CanvasContext) {
    if (!this.image) {
      return;
    }
    ctx.save();
    if (this.circle) {
      this.drawCircle(ctx);
    }
    ctx.drawImage(this.image, this.left, this.top, this.width, this.height);
    ctx.restore();
  }

  private drawCircle(ctx: wx.CanvasContext) {
    const radius = Math.max(this.width, this.height) / 2;
    const x = this.left + this.width / 2;
    const y = this.top + this.height / 2;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.clip();
  }
}
