module.exports = {
  // entryFiles: ['pages/home/home.json'],
  alias: {
    'miniapp-canvas': "./miniapp-canvas.js"
  },
  presets: ['weapp'],
  plugins: [
    ['less', {
      extensions: ['.wxss'],
      outExt: '.wxss'
    }], 'typescript'
  ]
}
