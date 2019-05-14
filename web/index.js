import MC, { createElement } from './miniapp-canvas.web';

const mc = new MC('my-canvas')

let accTop = 0;

function createConfigElement(el) {
  const top = typeof el.top === 'undefined' ? 0 : el.top;
  const height = el.height || 16
  accTop += top + height
  el.top = accTop
  el.left = 20;
  return el
}


const textMiddle = {
  type: 'text',
  top: 0,
  left: 80,
  textBaseline: 'middle',
  text: 'name',
}

const imageBorderBoxShadow = {
  type: 'image',
  src: 'https://avatars1.githubusercontent.com/u/4362412?s=40&v=4',
  width: 50,
  height: 50,
  top: 10,
  left: 20,
  borderRadius: 25,
  borderColor: 'yellow',
  borderWidth: 5,
  boxShadow: `0 0 10px #0f0`
}

const textShadow = {
  type: 'text',
  text: `from: https://github.com/landn172`,
  top: 10,
  left: 20,
  textShadow: '10px 10px 5px #0f0'
}

const rectBorderBoxShadow = {
  type: 'rect',
  width: 50,
  height: 50,
  left: 20,
  top: 20,
  // borderRadius: 10,
  borderWidth: 10,
  backgroundColor: '#0f0',
  boxShadow: '1px 1px 10px #cccccc'
}
const textstr = '这是一段测试文本；这是一段测试文本；这是一段测试文本；'

const textDecoration1 = {
  type: 'text',
  text: textstr,
  top: 40,
  left: 20,
  textBaseline: 'middle',
  lineClamp: 3,
  width: 100,
  textDecoration: 'underline',
  color: '#ccc'
}

const textDecoration2 = {
  type: 'text',
  text: textstr,
  top: 40,
  left: textShadow,
  textBaseline: 'top',
  textDecoration: 'overline dashed',
  lineClamp: 3,
  width: 100,
  color: 'blue'
}

const textDecoration3 = {
  type: 'text',
  text: textstr,
  top: 40,
  left: 220,
  textBaseline: 'bottom',
  fontSize: 18,
  textDecoration: 'line-through red dotted',
  lineClamp: 3,
  width: 100,
  color: 'green'
}

const qrCode = {
  type: 'qrcode',
  content: 'https://www.baidu.com/',
  top: -50,
  left: 20,
  width: 100,
  height: 100
}

const rectBorderRadiusBorderBoxShadow = {
  type: 'rect',
  top: 10,
  width: 50,
  height: 50,
  left: 10,
  // backgroundColor: 'blue',
  borderRadius: 10,
  borderColor: `green`,
  borderWidth: 5,
  boxShadow: '0px 0px 20px #f0f' //[0, 0, 20, '#f0f']
}

const rectBackgroundColor = {
  type: 'rect',
  width: 50,
  height: 50,
  left: textShadow,
  top: 0,
  bgColor: 'yellow'
}

const imageBoxShadow = {
  type: 'image',
  width: 50,
  height: 50,
  top: 0,
  left: textShadow,
  image: 'https://img1.tuhu.org/Images/Products/b501/494c/06db34b118582f98feff7931_w800_h800.jpg@160h_99q.jpg',
  circle: true,
  boxShadow: '10px 2px 20px #00f' //[10, 2, 20, '#00f']
}

const elements = [
  // textMiddle,
  // textShadow,
  // imageBorderBoxShadow,
  rectBorderBoxShadow,
  // textDecoration1,
  // textDecoration2,
  // textDecoration3,
  // qrCode,
  // rectBorderRadiusBorderBoxShadow,
  // rectBackgroundColor,
  // imageBoxShadow
].map(createConfigElement)

mc.loadConfig(elements)

mc.draw()

createHTMLElement(elements)

function createHTMLElement(elements) {
  const container = document.createElement('div')
  addStyle(container, {
    position: 'absolute',
    left: `300`,
    top: '0',
    width: '1000',
    height: '1000'
  })
  elements.forEach(el => {
    const element = createElement(el)
    const type = element.type
    const div = document.createElement(type === 'image' ? 'img' : 'div')
    addStyle(div, {
      position: 'absolute',
      ...element
    })
    container.appendChild(div)
  })

  document.body.appendChild(container)
}

function addStyle(el, obj) {
  const keys = Object.keys(obj)
  keys.forEach(key => {
    if (typeof obj[key] === 'function') return
    if (noStyle(key)) {
      el[key] = obj[key]
      return
    }
    el.style[key] = addUnit(key, obj[key])
  })
}

function addUnit(key, value) {
  const keys = ['width', 'height', 'top', 'left', 'lineHeight', 'borderRadius']
  if (keys.includes(key)) {
    return value + 'px'
  }

  return value
}

function noStyle(key) {
  const keys = ['textContent', 'src']
  return keys.includes(key)
}
