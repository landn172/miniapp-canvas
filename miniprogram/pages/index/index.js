import TempCanvas from '../../templates/temp1'

Page({
  data: {
    width: 0,
    height: 0
  },
  onReady() {
    this.canvas = new TempCanvas('canvas-id')
    const {width, height} = this.canvas
    this.setData({
      width,
      height
    })

  },
  confirm() {
    this.canvas.loadData({
      userName: this.value
    }).generate()
  },
  blur(e) {
    this.value = e.detail.value
  }
})
