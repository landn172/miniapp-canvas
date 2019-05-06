// @ts-ignore
global.wx = {
  getSystemInfoSync() {
    return {
      screenWidth: 375,
      windowWidth: 375
    };
  },
  createCanvasContext() {
    const obj = {};
    return new Proxy(obj, {
      get(target, key, receiver) {
        if (key === 'width') {
          return 1;
        }
        return Reflect.get(target, key, receiver) || function() {};
      },
      set(target, key, value, receiver) {
        return Reflect.set(target, key, value, receiver);
      }
    });
  },
  getImageInfo(obj: { success: Function }) {
    obj.success({
      width: 100,
      height: 100
    });
  }
};

import MC, { createElement } from '../src/index';

test('createElement', () => {

  const img = createElement({
    type: 'image',
    image: 'https://xxx',
    width: 100,
    border: '1px solid #fff'
  });

  const rect = createElement({
    type: 'rect',
    borderWidth: 1
  });

  const text = createElement({
    type: 'text',
    fontSize: 24
  });

  const qrcode = createElement({
    type: 'qrcode',
    content: 'sadfasdf'
  });

  expect(img.width).toBe(100);
  expect(rect.borderWidth).toBe(1);
  expect(text.fontSize).toBe(24);
  expect(qrcode.content).toBe('sadfasdf');
});

test('loadElements', () => {
  const img = createElement({
    type: 'image',
    image: 'https://xxx',
    width: 100,
    border: '1px solid #fff'
  });

  const rect = createElement({
    type: 'rect',
    borderWidth: 1
  });

  const text = createElement({
    type: 'text',
    fontSize: 24
  });

  const qrcode = createElement({
    type: 'qrcode',
    content: 'sadfasdf'
  });

  const mc = new MC('test');

  mc.loadElements([img, rect, text, qrcode])
});

test('loadConfig', () => {
  const mc = new MC('test');
  mc.loadConfig([
    {
      type: 'image',
      border: '1px solid #fff'
    }
  ]);
});
