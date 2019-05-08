# miniapp-canvas

生成分享朋友圈图片

## 支持绘制类型

- [基本](elements/base.md)
- [文字](elements/text.md)
- [图片](elements/image.md)
- [矩形](elements/rect.md)
- [二维码](elements/qrcode.md)

## 示例

```ts
// SharePYQ.ts
import MC, { createElement } from 'miniapp-canvas';

export function createSharePYQ(url, avatar) {
  const img = createElement({
    type: 'image',
    width: 100,
    height: 100,
    image: 'https://avatars1.githubusercontent.com/u/4362412?s=100&v=4'
  });

  const qrcode = createElement({
    type: 'qrcode',
    top: 100,
    left: 20,
    width: 200,
    height: 200,
    content: 'https://github.com/landn172'
  });

  const mc = new MC('canvas-id');

  // 加载元素
  mc.loadElements([img, rect, text, qrcode]);
  // 绘制元素
  mc.draw();
  // 保存canvas截图
  return mc.saveImage().then(tempFilePath => {
    // tempFilePath use wx.canvasToTempFilePath
  });
}
```

```ts
// page.ts
import { createSharePYQ } from 'sharePYQ.ts';

Page({
  onTapShare() {
    createSharePYQ(
      'https://github.com/landn172',
      'https://avatars1.githubusercontent.com/u/4362412?s=100&v=4'
    ).then(tempFilePath => {
      console.log(tempFilePath);
    });
  }
});
```

```xml
// page.wxml
<view class="container">
  <canvas canvas-id="canvas-id" style="width:200px;height:200px;" disable-scroll="true"></canvas>
</view>
```

## 参数

### 实例化参数

```ts
import MC from 'miniapp-canvas';
const mc = new MC('canvas-id', 'rpx');
```

| 参数名   | 类型   | 默认值  | 描述         |
| -------- | ------ | ------- | ------------ |
| canvasId | string | default | canvas 的 id |
| unit     | string | px      | 单位         |
|          |        |         |              |

### 方法

- **loadConfig** _加载 json 配置文件_

```ts
mc.loadConfig([
  {
    type: image,
    image: 'https://xxx'
  }
]);
```

- **loadElements** 加载元素(参考示例)
- **clear** _清空加载的元素_
- **draw** _开始绘制 canvas_
- **saveImage** _保存 canvas 截图_