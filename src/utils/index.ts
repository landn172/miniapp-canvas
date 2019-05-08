import * as api from 'platforms/index';

export * from './promisify';

const localcache = new Map();

export function cache(key: string, value: any) {
  localcache.set(key, value);
}

export function getCache(key: string) {
  return localcache.get(key);
}

const systemInfo = api.getSystemInfoSync();
const screenScale = (systemInfo.screenWidth || systemInfo.windowWidth) / 750;
const rpxReg = /([0-9]+(?:[.]{1}[0-9]+){0,1})(rpx|px)/;

/**
 * rpx => px
 * @example
 *  iphone6
 *  rpx2px(750) => 375
 *  rpx2px('1rpx solid #000') => '0.5px solid #000'
 * @param rpx
 */
export function rpx2px(rpx: number | string) {
  if (typeof rpx === 'number') {
    return rpx * screenScale;
  }

  if (typeof rpx === 'string') {
    return rpx.replace(rpxReg, (full, value, unit) => {
      let res = 0;
      if (unit === 'rpx') {
        res = value * screenScale;
      } else if (unit === 'px') {
        res = value;
      }
      return res + unit;
    });
  }

  return rpx;
}
