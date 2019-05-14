import * as api from 'platforms/index';
import { deprecated } from 'src/utils/decorators';
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
  src: string = '';

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
    // 当绘制图片时， 遇到clip时阴影不能绘制
    // if (this.boxShadow) {
    //   ctx.save();
    //   this.type = 'rect';
    //   super.draw(ctx);
    //   ctx.fill()
    //   this.type = 'image';
    //   ctx.restore();
    // }

    super.draw(ctx);

    if (!this.src) {
      return;
    }
    if (this.backgroundColor) {
      ctx.save();
      ctx.fillStyle = this.backgroundColor;
      ctx.fillRect(this.top, this.left, this.width, this.height);
      ctx.restore();
    }
    // @ts-ignore
    ctx.drawImage(this.src, this.left, this.top, this.width, this.height);
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
