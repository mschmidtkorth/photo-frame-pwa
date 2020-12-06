// store/index.js

import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'

import app from './app'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  name: 'global',
  plugins: [pathify.plugin], // activate plugin
  modules: {
    app
  }
})
