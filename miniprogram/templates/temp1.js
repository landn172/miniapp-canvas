/**!
 * 模板1
 * github用户头像、姓名、位置、主页
 */

import MC from '../miniapp-canvas';


export default class TempCanvas {
  constructor(canvasId) {
    this.canvas = new MC(canvasId)
    this.width = 400
    this.height = 150
  }

  loadData(data = {}) {
    this.data = data
    return this
  }

  generate() {
    const {userName} = this.data
    wx.request({
      url: `https://api.github.com/users/${userName}`,
      success: (res) => {
        render(this.canvas, res.data)
      },
      fail: () => {
        failRender(this.canvas)
      }
    })

    return this
  }
}

function render(canvas, data) {
  const {avatar_url, name, location, html_url} = data
  const nameText = {
    type: 'text',
    top: 45,
    left: 80,
    textBaseline: 'middle',
    text: name,
  }

  const avatarImage = {
    type: 'image',
    image: avatar_url,
    width: 50,
    height: 50,
    top: 20,
    left: 20,
    circle: true
  }

  const locationText = {
    type: 'text',
    text: `from: ${location}`,
    top: 120,
    left: 20
  }

  const homePage = {
    type: 'text',
    text: `homepage: ${html_url}`,
    color: 'blue',
    top: 100,
    left: 20
  }

  const borderRect = {
    type: 'rect',
    width: 350 - 20,
    height: 150 - 20,
    left: 10,
    top: 10,
    solid: false,
    borderRadius: 10,
    boxShadow: '2px 2px 10px #cccccc'
  }

  canvas.clear()
  canvas.loadConfig([borderRect, nameText, avatarImage, locationText, homePage]).then(() => {
    canvas.draw()
  })
}

function failRender(canvas) {
  canvas.loadConfig([{
    type: 'text',
    text: '加载失败...'
  }]).then(() => {
    canvas.draw()
  })
}
