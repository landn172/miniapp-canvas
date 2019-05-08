import * as api from 'platforms/index';
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
  /**
   * 显示圆形
   *
   * @type {boolean}
   * @memberof ImageElement
   */
  circle: boolean = false;

  /**
   * 图片路径
   *    本地路径
   *    在线路径
   */
  image: string = '';

  /**
   * Creates an instance of ImageElement.
   * @memberof ImageElement
   */
  constructor() {
    super();
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
        if (path) {
          this.image = path;
        }
        return path;
      } catch (error) {
        console.log(error);
      }

      return url;
    }

    return url;
  }

  protected async draw(ctx: wxNS.CanvasContext) {
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
      const fillStyle = 'white';
      ctx.fillStyle = fillStyle;
      super.pathBorderRadius(ctx);
      ctx.closePath();
      ctx.clip();
      ctx.setGlobalAlpha(1);
    }
    console.log('drawImage', this.image, this.left, this.top, this.width, this.height)
    // @ts-ignore
    ctx.drawImage(this.image, this.left, this.top, this.width, this.height);
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
