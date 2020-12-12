import Vue from 'vue'
import { LocalStorage } from 'quasar'
import { empty } from '../utils/stringUtil'

const apikey = LocalStorage.getItem('apikey')

export const store = Vue.observable({
  authReady: false,
  authInProgress: false,
  isSignedIn: false,
  images: [],
  imagesLoading: false,
  apikey: apikey,
  currentSlideIndex: 1,
  autoplay: 8000,
  albumLoaded: function () {
    return this.images.length > 0
  },
  validApikey: function () {
    return !empty(this.apikey)
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
