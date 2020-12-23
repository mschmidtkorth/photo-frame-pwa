import { register } from 'register-service-worker'

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

import { store } from '../src/boot/store'

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  registrationOptions: { scope: './' },

  async ready (reg) {
    console.log('PHSW:Service worker is active.')
    store.registration = reg
    // try {
    //   await reg.periodicSync.register('content-sync', {
    //     // An interval of one day.
    //     // minInterval: 24 * 60 * 60 * 1000
    //     minInterval: 60 * 1000
    //   })
    // } catch (error) {
    //   console.log('PHSW:periodSync Error: ', error)
    //   // Periodic background sync cannot be used.
    // }
  },

  registered (/* registration */) {
    console.log('PHSW:Service worker has been registered.')
    // TODO add timeout to check for new updates
  },

  cached (/* registration */) {
    console.log('PHSW:Content has been cached for offline use.')
  },

  updatefound (/* registration */) {
    console.log('PHSW:New content is downloading.')
  },

  updated (reg) {
    console.log('PHSW:registration:', reg)

    console.log('PHSW:New content is available; please refresh.')
    store.registration = reg
    store.showAppUpdatedBanner = true
  },

  offline () {
    console.log(
      'PHSW:No internet connection found. App is running in offline mode.'
    )
  },

  error (err) {
    console.error('PHSW:Error during service worker registration:', err)
  }
})
