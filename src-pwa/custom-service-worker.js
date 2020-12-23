/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

/*
  dependencies
*/
import { BroadcastUpdatePlugin } from 'workbox-broadcast-update'
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkOnly
} from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

/*
  config
*/
// self.__WB_DISABLE_DEV_LOGS = true
precacheAndRoute(self.__WB_MANIFEST)

// This stops index.html from updating in the old service worker

const handler = createHandlerBoundToURL('/index.html')
const navigationRoute = new NavigationRoute(handler)
registerRoute(navigationRoute)

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('PHSW: skipping waiting')
    self.skipWaiting()
  }
})

/*
caching strategies
*/

// registerRoute(
//   ({ url }) => url.pathname.startsWith('/sockjs-node/'),
//   new NetworkOnly()
// )
registerRoute(
  ({ url }) => url.host.startsWith('apis.google.com'),
  new NetworkOnly()
)
// TODO add networkonly for album apis

registerRoute(
  ({ url }) => url.host.startsWith('fonts.g'),
  new CacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
)

// registerRoute(
//   ({ url }) => url.href.startsWith('http'),
//   new StaleWhileRevalidate({
//     plugins: [new BroadcastUpdatePlugin()]
//   })
// )

registerRoute(
  ({ url }) => url.href.startsWith('http'),
  new StaleWhileRevalidate({})
)
