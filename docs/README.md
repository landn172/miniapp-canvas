# miniapp-canvas 

[github](https://landn172.github.io/miniapp-canvas/)

基于json，生成分享朋友圈图片

## 支持绘制类型

- [基本](elements/base.md)
- [文字](elements/text.md)
- [图片](elements/image.md)
- [矩形](elements/rect.md)
- [二维码](elements/qrcode.md)

## 示例

```ts
// SharePYQ.ts
import MC, { html } from 'miniapp-canvas';

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
	const result = html`
      <m-rect width="100" height="100" backgroundColor="#f0f"></m-rect>
      <m-image
        src="https://avatars1.githubusercontent.com/u/4362412?s=40&v=4"
        width="60"
        height="60"
        left="50"
        top="90"
        borderRadius="6"
      ></m-image>
      <m-text text="wo shi m-text"></m-text>
      <m-qrcode top="100" width="100" height="100" content="https://baidu.com/"/>
   `;
  
  // 加载元素
  mc.loadHtm(result);
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

```xml
<canvas canvas-id='canvas-id' id="canvas-id"></canvas>
```

```ts
import MC from 'miniapp-canvas';
const mc = new MC('canvas-id', 'px');
```

| 参数名   | 类型   | 默认值  | 描述         |
| -------- | ------ | ------- | ------------ |
| canvasId | string | default | canvas-id |
| unit     | string | px      | 单位         |

### 方法

* **loadHtm** 加载`html()`生成的数据

```ts

```



- **loadConfig** _加载 json 配置文件_

```ts
import MC from 'miniapp-canvas';
const mc = new MC('canvas-id', 'px');
mc.loadConfig([
  {
    type: 'image',
    src: 'https://xxx'
  }
]);
```

- **loadElements** 加载元素(参考示例)
- **clear** _清空加载的元素_
- **draw** _开始绘制 canvas_
- **saveImage** _保存 canvas 截图_
