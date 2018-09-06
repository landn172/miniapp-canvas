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

    // 在线资源
    if (httpSrc.test(url)) {
      try {
        const path = await downloadImage(url);
        this.image = path;
        return path;
      } catch (error) {
        console.log(error);
      }

      return url;
    }

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
      ctx.beginPath();
      ctx.setGlobalAlpha(0);
      ctx.setFillStyle('white');
      super.pathBorderRadius(ctx);
      ctx.closePath();
      ctx.clip();
      ctx.setGlobalAlpha(1);
    }
    ctx.drawImage(this.image, this.left, this.top, this.width, this.height);
    ctx.restore();
  }
}

/* 重试次数 */
const TRY_COUNT = 2;

async function downloadImage(url: string) {
  for (let i = 0; i < TRY_COUNT; i++) {
    try {
      const res = await promisify<any>(wx.getImageInfo, {
        src: url
      });

      return res.path;
    } catch (error) {
      console.log(error);
    }
  }
}
