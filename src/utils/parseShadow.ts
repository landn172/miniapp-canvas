import { getSizeAndUnitReg } from '../utils/reg';
import findColor from './findColor';
import { rpx2px } from './index';

const cacheShadow = new Map();

export function parseShadow(boxShadow = ''): any[][] {
  if (cacheShadow.has(boxShadow)) {
    return cacheShadow.get(boxShadow);
  }

  const shadows = [] as any[];
  const getSizeAndUnitRegGlobal = new RegExp(getSizeAndUnitReg, 'ig');
  let match;

  if (!boxShadow) {
    return [];
  }

  const values = boxShadow.split(',');

  for (const v of values) {
    const shadow = [] as any[];
    const color = findColor(v);
    if (!color) {
      throw new Error('[boxShadow] 未设置颜色');
    }
    // tslint:disable-next-line:no-conditional-assignment
    while ((match = getSizeAndUnitRegGlobal.exec(v))) {
      const [, size, unit = 'px'] = match;
      if (unit === 'rpx') {
        shadow.push(Number(rpx2px(size)));
      } else {
        shadow.push(Number(size));
      }
    }
    // canvas 不支持css的 阴影扩散半径
    shadow[3] = color;
    shadow.length = 4;

    shadows.push(shadow);
  }
  cacheShadow.set(boxShadow, shadows);

  return shadows;
}
