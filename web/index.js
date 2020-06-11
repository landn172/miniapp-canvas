import MC, { createElement, html } from './miniapp-canvas.web';

const mc = new MC('my-canvas')

let accTop = 0;

function createConfigElement(el) {
  const top = typeof el.top === 'undefined' ? 0 : el.top;
  const height = el.height || 16
  accTop += top + height
  el.top = accTop
  return el
}


const textMiddle = {
  type: 'text',
  top: 0,
  left: 10,
  lineHeight: 40,
  textBaseline: 'middle',
  backgroundColor: '#00f',
  text: 'textMiddle',
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
  borderStyle: 'solid',
  borderWidth: 5,
  boxShadow: `0 0 10px #0f0`
}

const textShadow = {
  type: 'text',
  text: `textShadow`,
  top: 20,
  left: 0,
  textShadow: '2px 2px #ff0000'
}

const textShadowBg = {
  type: 'text',
  text: `textShadowBg textShadowBg`,
  top: 20,
  left: 0,
  width: 100,
  lineClamp: 2,
  overflow: `hidden`,
  color: 'red',
  backgroundColor: '#00f',
  textShadow: '2px 2px #0f0'
}

const rectBorderBoxShadow = {
  type: 'rect',
  width: 50,
  height: 50,
  left: 20,
  top: 20,
  borderRadius: 20,
  borderWidth: 10,
  borderColor: 'yellow',
  borderStyle: 'solid',
  backgroundColor: 'rgba(0,0,0, 0)',
  boxShadow: '1px 10px 10px red'
}


const rectBorderBoxShadow2 = {
  type: 'rect',
  width: 50,
  height: 50,
  left: 20,
  top: 20,
  borderRadius: 10,
  borderWidth: 10,
  boxShadow: '1px 1px 10px #0f0'
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
  top: 50,
  left: 10,
  textBaseline: 'top',
  textDecoration: 'overline dashed',
  lineClamp: 3,
  width: 100,
  color: 'blue'
}

const textDecoration3 = {
  type: 'text',
  text: textstr,
  top: 70,
  left: 10,
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
  top: -30,
  left: 10,
  width: 100,
  height: 100,
  border: `1px solid #00f`
}

const imageBoxShadow = {
  type: 'image',
  width: 50,
  height: 50,
  top: 0,
  left: 10,
  image: 'https://img1.tuhu.org/Images/Products/b501/494c/06db34b118582f98feff7931_w800_h800.jpg@160h_99q.jpg',
  boxShadow: '10px 2px 20px #00f' //[10, 2, 20, '#00f']
}

const elements = [
  textMiddle,
  textShadow,
  textShadowBg,
  imageBoxShadow,
  imageBorderBoxShadow,
  rectBorderBoxShadow,
  rectBorderBoxShadow2,
  textDecoration1,
  textDecoration2,
  textDecoration3,
  qrCode,
].map(createConfigElement)

mc.loadConfig(elements)

mc.draw()

createHTMLElement(elements)

function createHTMLElement(elements) {
  const container = document.createElement('div')
  addStyle(container, {
    position: 'absolute',
    left: `150px`,
    top: '0px',
    width: '1000px',
    height: '1000px'
  })
  elements.forEach(el => {
    const attr = createElement(el).getAttrs()
    const type = attr.type
    const div = document.createElement(type === 'image' ? 'img' : 'div')
    console.log(attr.style)
    addStyle(div, {
      position: 'absolute',
      ...attr.style
    })
    delete attr.style;
    Object.keys(attr).forEach(key => (div[key] = attr[key]))
    container.appendChild(div)
  })

  document.body.appendChild(container)
}

function addStyle(el, obj) {
  const keys = Object.keys(obj)
  keys.forEach(key => {
    el.style[key] = addUnit(key, obj[key])
  })
}

function addUnit(key, value) {
  return value
}

// mc.loadHtm(html`<mc-rect width="30" height="30" backgroundColor="#333"></mc-rect>`);

// mc.draw();

