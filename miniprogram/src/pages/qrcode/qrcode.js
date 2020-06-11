import MC, { createElement } from 'miniapp-canvas';



Page({
  /**
   * 页面的初始数据
   */
  data: {
    width: 300,
    height: 300
  },
  onLoad() {
    const mc = this.canvas = new MC('canvas-id')
    const qrCode = createElement({
      type: 'qrcode',
      props: {
        content: 'https://www.baidu.com/',
        top: 20,
        left: 20,
        width: 200,
        height: 200
      }
    })
    mc.loadElements([qrCode])

    mc.draw();

    mc.saveImage().then(t => console.log('saveImage', t))
    mc.on('drawed', () => console.log('draw qrcode success'))
  }
})
