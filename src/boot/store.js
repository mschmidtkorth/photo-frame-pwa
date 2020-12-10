import Vue from 'vue'
import { LocalStorage } from 'quasar'
const apikey = LocalStorage.getItem('apikey')

export const store = Vue.observable({
  images: [],
  imagesLoading: true,
  authReady: false,
  isSignedIn: false,
  apikey: apikey,
  albumLoaded: function () {
    return this.images.length > 0
  }
})
export const actions = {
  setApikey: function (val) {
    if (val === 'null' || val === null) return
    store.apikey = val
    LocalStorage.set('apikey', val)
  }
}

Vue.prototype.$store = store
Vue.prototype.$actions = actions
