# miniapp-canvas

生成分享朋友圈图片

## 支持绘制类型

* [基本](elements/base.md)
* [文字](elements/text.md)
* [图片](elements/image.md)
* [矩形](elements/rect.md)
* [二维码](elements/qrcode.md)

## 示例

```ts
import MC, {createElement} from 'miniapp-canvas'

const img = createElement({
  type: 'image',
  image: 'https://avatars1.githubusercontent.com/u/4362412?s=100&v=4'
})

const qrcode = createElement({
  type: 'qrcode',
  content: 'https://github.com/landn172'
});

const mc = new MC('canvas-id');

// 加载元素
mc.loadElements([img, rect, text, qrcode]);
// 绘制元素
mc.draw();
// 保存canvas截图
mc.saveImage()
  .then(tempFilePath => {
    // tempFilePath use wx.canvasToTempFilePath
  })
```

## 参数

### 实例化参数

```ts
import MC  from 'miniapp-canvas'
const mc = new MC('canvas-id', 'rpx')
```

| 参数名   | 类型   | 默认值  | 描述       |
| -------- | ------ | ------- | ---------- |
| canvasId | string | default | canvas的id |
| unit     | string | px      | 单位       |
|          |        |         |            |

### 方法

* **loadConfig**  *加载json配置文件*

```ts
mc.loadConfig([{
  type: image,
  image: 'https://xxx'
}])
```

* **loadElements** 加载元素(参考示例)
* **clear** *清空加载的元素*
* **draw** *开始绘制canvas*
* **saveImage**  *保存canvas截图*