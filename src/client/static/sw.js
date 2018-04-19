importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "mavel",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.3f904a12506c42a0cc8d.js",
    "revision": "96f0b632006babc5e99fc90494e63fd7"
  },
  {
    "url": "/_nuxt/app.caa4ce4e64d398a5b4990b036dd8a3d1.css",
    "revision": "caa4ce4e64d398a5b4990b036dd8a3d1"
  },
  {
    "url": "/_nuxt/layouts/default.f9f3de890eeb49e76f3d.js",
    "revision": "b1fbe06cd03125296eaa87f7a289d260"
  },
  {
    "url": "/_nuxt/manifest.e643529aac0ed53a61c5.js",
    "revision": "93de78618d51b0c2685d0b9e5d420f45"
  },
  {
    "url": "/_nuxt/pages/about.e8543709a9336c5c0ee1.js",
    "revision": "7d51d9e311bc1c832ab1fe7edec3ff13"
  },
  {
    "url": "/_nuxt/pages/index.d9159359ef84423a6f34.js",
    "revision": "68a53bb557a05c98a359e4eedfdedefb"
  },
  {
    "url": "/_nuxt/vendor.35537ff63d5eb001e5e5.js",
    "revision": "9b32af585727b97a781c6d47fa17b4d3"
  },
  {
    "url": "/_nuxt/workbox.3de3418b.js",
    "revision": "a9890beda9e5f17e4c68f42324217941"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

