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
    "revision": "adce7222e8220cdcb36425f9ef6ce53a"
  },
  {
    "url": "assets/css/0.styles.e69073ac.css",
    "revision": "10d36c6aceb007aab3eebc65fc687220"
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
    "url": "assets/js/3.643b2119.js",
    "revision": "8aa18fc60f6e1757607911ab8d0890c8"
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
    "url": "assets/js/7.2ea9fd94.js",
    "revision": "dc67ef469552ba77eb830208fa04d41f"
  },
  {
    "url": "assets/js/8.4cf4a687.js",
    "revision": "75f29cb771eed97787af4bdd06006e02"
  },
  {
    "url": "assets/js/9.e3816d90.js",
    "revision": "1f7d64e683db05eb1dc587b15591d76d"
  },
  {
    "url": "assets/js/app.232176a6.js",
    "revision": "d014472981b0a9611d03823a57de3b64"
  },
  {
    "url": "elements/base.html",
    "revision": "3290efe940471218efe4e52ee08aa770"
  },
  {
    "url": "elements/image.html",
    "revision": "521c2b8a692363747ce783c49129a940"
  },
  {
    "url": "elements/qrcode.html",
    "revision": "82481e8e0aa289fcbf5167af6b10ce72"
  },
  {
    "url": "elements/rect.html",
    "revision": "90953bf698a77402a978e99c8a4566dd"
  },
  {
    "url": "elements/text.html",
    "revision": "da03e9dacdbfbb66c11fb0f9e22c0c51"
  },
  {
    "url": "index.html",
    "revision": "b54d7be0f736cf08cb74c139b41fe2f4"
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
