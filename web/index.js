import MC from './miniapp-canvas.web';

const mc = new MC('my-canvas')

const nameText = {
  type: 'text',
  top: 45,
  left: 80,
  textBaseline: 'middle',
  text: 'name',
}

const avatarImage = {
  type: 'image',
  image: 'https://avatars1.githubusercontent.com/u/4362412?s=40&v=4',
  width: 50,
  height: 50,
  top: 20,
  left: 20,
  circle: true
}

const locationText = {
  type: 'text',
  text: `from: https://github.com/landn172`,
  top: 120,
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
const textstr = '这是一段测试文本；这是一段测试文本；这是一段测试文本；'

const baseTop = 150

mc.loadConfig([
  nameText,
  avatarImage,
  locationText,
  borderRect,
  {
    type: 'text',
    text: textstr,
    top: baseTop + 20,
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
    top: baseTop + 20,
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
    top: baseTop + 20,
    left: 220,
    textBaseline: 'bottom',
    fontSize: 18,
    textDecoration: 'line-through red dotted',
    lineClamp: 3,
    width: 100,
    color: 'green'
  },
  {
    type: 'qrcode',
    content: 'https://www.baidu.com/',
    top: baseTop + 80,
    left: 20,
    width: 100,
    height: 100
  },
  {
    type: 'rect',
    top: baseTop + 200,
    width: 50,
    height: 50,
    left: 10,
    bgColor: 'red',
    solid: false,
    borderRadius: 10,
    boxShadow: '0px 0px 20px #f0f' //[0, 0, 20, '#f0f']
  },
  {
    type: 'rect',
    width: 150,
    height: 150,
    left: 120,
    top: baseTop + 200,
    bgColor: 'yellow'
  },
  {
    type: 'image',
    width: 50,
    height: 50,
    top: baseTop + 200,
    left: 120,
    image: 'https://img1.tuhu.org/Images/Products/b501/494c/06db34b118582f98feff7931_w800_h800.jpg@160h_99q.jpg',
    circle: true,
    boxShadow: '10px 2px 20px #00f' //[10, 2, 20, '#00f']
  }
])

mc.draw()

console.log(mc)
