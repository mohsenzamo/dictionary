import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
// import { register } from 'register-service-worker'
declare const self: any
precacheAndRoute(self.__WB_MANIFEST)
registerRoute(
  ({ url }) => url.pathname.startsWith('https://nebrasar.ir/sounds'),
  new CacheFirst()
)
