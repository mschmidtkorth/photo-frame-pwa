import Vue from 'vue'
import { LocalStorage } from 'quasar'
const apikey = LocalStorage.getItem('apikey')

const store = Vue.observable({
  images: [],
  error: '',
  loading: false,
  authReady: false,
  isSignedIn: false,
  apikey: apikey,
  albumLoaded: false
})

const actions = {
  setApikey: function (val) {
    if (val === 'null' || val === null) return
    store.apikey = val
    LocalStorage.set('apikey', val)
  }
}

Vue.prototype.$store = store
Vue.prototype.$actions = actions
