import { make } from 'vuex-pathify'
import { LocalStorage } from 'quasar'
const apikey = LocalStorage.getItem('apikey')

const state = {
  images: [],
  error: '',
  loading: false,
  authReady: false,
  isSignedIn: false,
  apikey: apikey,
  albumLoaded: false
}

const mutations = make.mutations(state)
const actions = {
  ...make.actions('images'),
  setApikey: function (context, val) {
    if (val === 'null' || val === null) return
    context.commit('SET_APIKEY', val)
    LocalStorage.set('apikey', val)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
