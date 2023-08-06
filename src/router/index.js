import Vue from 'vue'
// import VueRouter from 'vue-router'

import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

import routes from './routes'
import { actions } from '../boot/actions'
// Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
	const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
			: createWebHashHistory;
	
  const Router = createRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
	  routes,

	  history: createHistory(process.env.VUE_ROUTER_BASE),

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });
  Router.beforeEach((to, from, next) => {
    var urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('apikey')) {
      actions.setLocalStorage('apikey', urlParams.get('apikey'))
      window.location.replace(window.location.origin)
    }
    document.title = `${to.name} | ${process.env.appName}`
    next()
  })

  return Router
}
