/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)
precacheAndRoute([
  { url: '/assets/logo.606e4261.png', revision: 'null' },
  { url: '/logo.png', revision: 'null' },
  { url: '/assets/IranNastaliq.4bdb04c4.ttf', revision: 'null' },
  { url: '/assets/neirizi.cd469c4d.ttf', revision: 'null' },
  { url: '/assets/Yekan.1bd96aee.ttf', revision: 'null' },
  { url: '/assets/IRANSans.dfe60b38.ttf', revision: 'null' }
])
registerRoute(
  ({ url }) => url.pathname.startsWith('https://nebrasar.ir/sounds'),
  new CacheFirst()
)
self.addEventListener('message', (event:any) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
    self.clients.claim()
  }
})
