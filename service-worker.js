/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "9fba825b2a65285bee436b2d360e963e"
  },
  {
    "url": "assets/css/0.styles.1752fcb4.css",
    "revision": "d86b2355ba7525511d770f766d212cea"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.fb512289.js",
    "revision": "ac3c07dd1687b332f8d66d63c115fd6c"
  },
  {
    "url": "assets/js/3.646a9140.js",
    "revision": "7b48c0ddcf791644adf37f7a24c54863"
  },
  {
    "url": "assets/js/4.b7418cf8.js",
    "revision": "36e377cf4cf5f302ce390ad1f78e5f0d"
  },
  {
    "url": "assets/js/5.21ce2e6d.js",
    "revision": "6fe7a607695f4398f8d9d933b74a697a"
  },
  {
    "url": "assets/js/6.173a18d0.js",
    "revision": "2a02b06b2df078e607c74e7af03f6f31"
  },
  {
    "url": "assets/js/7.9987b279.js",
    "revision": "65d6862756df684b02e7849e291b4bc6"
  },
  {
    "url": "assets/js/8.8633442f.js",
    "revision": "8a2f0faa9b9c2123f844113db61671e3"
  },
  {
    "url": "assets/js/9.e3816d90.js",
    "revision": "1f7d64e683db05eb1dc587b15591d76d"
  },
  {
    "url": "assets/js/app.51d89960.js",
    "revision": "a957bb18093558e70670ec1cbcb002c9"
  },
  {
    "url": "elements/base.html",
    "revision": "1fa7ff88ae4bff687470ad9c39a5ede4"
  },
  {
    "url": "elements/image.html",
    "revision": "59af64d6e5962509b44d285c542f03fa"
  },
  {
    "url": "elements/qrcode.html",
    "revision": "5aa44e3f84ec62997c684339a23b57cf"
  },
  {
    "url": "elements/rect.html",
    "revision": "aa1da80ecef7633d1ca224759d7c79d5"
  },
  {
    "url": "elements/text.html",
    "revision": "9b7072065bf95979f246b3c2d2da3519"
  },
  {
    "url": "index.html",
    "revision": "75dabc1b8968fa4561ddf9d86ca80463"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
