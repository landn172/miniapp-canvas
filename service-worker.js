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
    "revision": "fb24594e1cc83af00b47575d53019ac5"
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
    "url": "assets/js/3.6cc908d7.js",
    "revision": "7f5fc2174aca463b0dc2744eee6289c6"
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
    "url": "assets/js/app.04a17d84.js",
    "revision": "2bf024f6bc128fdf8fc69f938bd98ffd"
  },
  {
    "url": "elements/base.html",
    "revision": "d5de720e493b6f2782a86a45231d8765"
  },
  {
    "url": "elements/image.html",
    "revision": "b74d039547880ebde471c4ca6f70a52f"
  },
  {
    "url": "elements/qrcode.html",
    "revision": "c19ff0abb6b1c6a3c5f789bb0891662c"
  },
  {
    "url": "elements/rect.html",
    "revision": "3f300e8bf200a65cddbfa2f214658ea3"
  },
  {
    "url": "elements/text.html",
    "revision": "c92c07c2a068ee3b65319647a7280669"
  },
  {
    "url": "index.html",
    "revision": "a129c1fd75bbd8fc5741521c6d40bac6"
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
