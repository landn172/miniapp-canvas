import { cache, getCache, promisify } from '../utils';
import { TimeoutTask } from '../utils/task';
import RectElement from './RectElement';

const httpSrc = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/;

/**
 * 图片元素
 *
 * @export
 * @class ImageElement
 * @extends {BaseElement}
 * @property {boolean} circle 显示圆形
 */
export default class ImageElement extends RectElement {
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

    // if (getCache(url)) {
    //   return getCache(url);
    // }

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

  async draw(ctx: wx.CanvasContext) {
    if (!this.image) {
      return;
    }
    ctx.save();
    if (this.circle && !this.borderRadius) {
      this.borderRadius = Math.min(this.width, this.height) / 2;
    }

    this.bgColor = '#ffffff';
    super.draw(ctx);

    if (this.borderRadius) {
      ctx.setGlobalAlpha(0);
      ctx.setFillStyle('white');
      super.pathBorderRadius(ctx);
      ctx.clip();
      ctx.setGlobalAlpha(1);
    }
    ctx.drawImage(this.image, this.left, this.top, this.width, this.height);
    const drawPromise = TimeoutTask(
      new Promise(resolve => ctx.draw(true, resolve)),
      500
    );
    ctx.restore();

    return drawPromise;
  }
}
