import TempCanvas from '../../templates/temp2'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    height: 0,
    testStr: '这是一段测试文本；这是一段测试文本；这是一段测试文本'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.canvas = new TempCanvas('canvas-id')
    const {width, height} = this.canvas
    this.setData({
      width,
      height
    })

    this.canvas.draw()
  }
})
