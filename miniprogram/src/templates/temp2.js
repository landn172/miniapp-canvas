import MC from 'miniapp-canvas';

export default class TempCanvas {
  constructor(canvasId) {
    this.canvas = new MC(canvasId)
    this.width = 350;
    this.height = 300;
  }

  draw() {
    render(this.canvas)
  }
}

function render(canvas) {
  const textstr = '这是一段测试文本；这是一段测试文本；这是一段测试文本；'

  canvas.loadConfig([
    {
      type: 'text',
      text: textstr,
      top: 20,
      left: 20,
      textBaseline: 'middle',
      lineClamp: 3,
      width: 100,
      textDecoration: 'underline',
      color: '#ccc'
    },
    {
      type: 'text',
      text: textstr,
      top: 20,
      left: 120,
      textBaseline: 'top',
      textDecoration: 'overline dashed',
      lineClamp: 3,
      width: 100,
      color: 'blue'
    },
    {
      type: 'text',
      text: textstr,
      top: 20,
      left: 220,
      textBaseline: 'bottom',
      fontSize: 18,
      textDecoration: 'line-through red dotted',
      lineClamp: 3,
      width: 100,
      color: 'green'
    }
  ]).then(() => canvas.draw())
}
