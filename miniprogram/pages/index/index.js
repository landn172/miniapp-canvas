import MC from '../../miniapp-canvas'

Page({
  onReady() {
    const canvas = this.canvas = new MC('canvas-id')
    canvas.loadConfig([{
      type: 'text',
      text: 'this is test',
    }, {
      type: 'image',
      image: 'https://avatars1.githubusercontent.com/u/4362412?s=40&v=4',
      width: 50,
      height: 50,
      top: 20,
      circle: true
    }, {
      type: 'rect',
      width: 40,
      height: 40,
      top: 100,
      bgColor: '#ccc',
      stroke: 'blue',
      solid: false
    }, {
      type: 'rect',
      width: 40,
      height: 40,
      left: 100,
      top: 10,
      bgColor: 'rgba(255,255,255,.1)',
      shadow: [0, 0, 10, 'red']
    }]).then(() => {
      canvas.draw()
    })
  }
})
