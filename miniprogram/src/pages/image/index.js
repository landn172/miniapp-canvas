import MC, { createElement } from 'miniapp-canvas/index';

Page({
  data: {
    width: 300,
    height: 300
  },
  onReady() {
    const mc = this.canvas = new MC('canvas-id')
    const image = createElement({
      type: 'image',
      props: {
        src: 'https://avatars1.githubusercontent.com/u/4362412?s=40&v=4',
        width: 50,
        height: 50,
        top: 10,
        left: 20,
      }
    })
    
    const imageWidthBorder = createElement({
      type: 'image',
      props: {
        src: 'https://avatars1.githubusercontent.com/u/4362412?s=40&v=4',
        width: 50,
        height: 50,
        top: 80,
        left: 20,
        borderRadius: 25,
        borderColor: 'yellow',
        borderWidth: 5,
        borderStyle: 'solid',
      }
    })

    const imageWithShadowAndBorder = createElement({
      type: 'image',
      props: {
        src: 'https://avatars1.githubusercontent.com/u/4362412?s=40&v=4',
        width: 50,
        height: 50,
        top: 80,
        left: 120,
        borderRadius: 25,
        borderColor: 'yellow',
        borderWidth: 5,
        borderStyle: 'solid',
        boxShadow: `0 0 10px #0f0`
      }
    })

    const imageWidthRadius = createElement({
      type: 'image',
      props: {
        src: 'https://avatars1.githubusercontent.com/u/4362412?s=40&v=4',
        width: 50,
        height: 50,
        top: 160,
        left: 20,
        borderRadius: 25,
      }
    })

    const imageWithShadow = createElement({
      type: 'image',
      props: {
        src: 'https://avatars1.githubusercontent.com/u/4362412?s=40&v=4',
        width: 50,
        height: 50,
        top: 220,
        left: 20,
        boxShadow: `0 0 10px #0f0`
      }
    })

    mc.loadElements([image, imageWidthBorder, imageWidthRadius, imageWithShadow, imageWithShadowAndBorder])

    mc.draw();

    mc.saveImage().then(t => console.log('saveImage', t))
    mc.on('drawed', () => console.log('draw qrcode success'))
  },
})
