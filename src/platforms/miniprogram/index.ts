import { promisify } from '../../utils/promisify';
import { ICanvasToTempFilePath, IGetCanvasContext, IGetImageInfo, IGetSystemInfoSync } from '../platform';

export const platform = 'miniprogram';

export const getCanvasContext: IGetCanvasContext = (id: string, ctx?: any) => {
  if (ctx) {
    return polyfillContext(wx.createCanvasContext(id, ctx));
  }
  return polyfillContext(wx.createCanvasContext(id));
};

function polyfillContext(ctx: any) {
  return ctx;
}

/**
 * 获取属性
 */
export function getAttrs(obj: any) {
  const attrs: any = {};
  const keys = Object.keys(this);
  keys.forEach(key => {
    if (key.includes('_')) {
      return;
    }

    const value = this[key];
    if (typeof value === 'function') {
      return;
    }
    attrs[key] = this[key];
  });

  return attrs;
}

export function getCanvasWidthAndHeight(
  ctx: any
): {
  width: number;
  height: number;
} {
  const canvas = ctx.canvas;
  return canvas;
}

export const canvasToTempFilePath: ICanvasToTempFilePath = (
  canvasId: string,
  ctx?: any
) => {
  return promisify(wx.canvasToTempFilePath, {
    canvasId
  });
};

export const getImageInfo: IGetImageInfo = (url: string) => {
  return promisify(wx.getImageInfo, {
    src: url
  });
};

export const getSystemInfoSync: IGetSystemInfoSync = () => {
  return wx.getSystemInfoSync();
};
