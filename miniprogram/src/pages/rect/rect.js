import MC from 'miniapp-canvas';

// pages/rect/rect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 300,
    height: 300
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const mc = this.canvas = new MC('canvas-id')
    mc.loadConfig([
      {
        type: 'rect',
        width: 50,
        height: 50,
        left: 10,
        top: 10,
        backgroundColor: 'red',
        borderRadius: 5,
        boxShadow: '0px 0px 20px #f0f' //[0, 0, 20, '#f0f']
      },
      {
        type: 'rect',
        width: 50,
        height: 50,
        left: 120,
        top: 20,
        backgroundColor: 'yellow',
        borderColor: 'blue',
        borderWidth: 5,
        borderStyle: 'solid',
        boxShadow: '0px 0px 20px #f0f'
      },
      {
        type: 'rect',
        width: 50,
        height: 50,
        top: 120,
        left: 120,
        borderRadius: 50,
        boxShadow: '0px 0px 20px #f0f'
      },
      {
        type: 'rect',
        width: 50,
        height: 50,
        top: 80,
        left: 20,
        borderColor: 'blue',
        borderWidth: 5,
        borderStyle: 'solid',
        boxShadow: '0px 0px 20px #f0f'
      }])
    mc.draw()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
