module.exports = {
  // entryFiles: ['pages/home/home.json'],
  alias: {
    'miniapp-canvas': "../src",
    "platforms": "../src/platforms/miniprogram"
  },
  presets: ['weapp'],
  plugins: [
    ['less', {
      extensions: ['.wxss'],
      outExt: '.wxss'
    }], 'typescript'
  ]
}
