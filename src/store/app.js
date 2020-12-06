import { make } from 'vuex-pathify'

const state = {
  images: [],
  error: '',
  loading: false,
  authReady: true
}

const mutations = make.mutations(state)
const actions = {
  ...make.actions('images')
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
