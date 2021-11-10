/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)
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
