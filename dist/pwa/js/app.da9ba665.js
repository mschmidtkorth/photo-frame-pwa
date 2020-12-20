/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({}[chunkId]||chunkId) + "." + {"2":"62762d59","3":"7c913698","4":"6ff23e1c","5":"7f405dea"}[chunkId] + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"2":1,"3":1,"4":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "css/" + ({}[chunkId]||chunkId) + "." + {"2":"9b0bfbdd","3":"17dfde88","4":"aba3fa45","5":"31d6cfe0"}[chunkId] + ".css";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.request = request;
/******/ 					delete installedCssChunks[chunkId]
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("2f39");


/***/ }),

/***/ "0047":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1103":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return loadImages; });
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e6cf");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0__);


const loadAlbums = function () {
  return window.gapi.client.photoslibrary.albums.list({}).then(function (fullResponse) {
    const albums = fullResponse.result.albums;
    return albums;
  });
};

const getImages = async function (id) {
  let images = [];

  const getAlbumImageChunk = function (id, nextPageToken) {
    const h = window.innerHeight;
    const w = window.innerWidth;
    return window.gapi.client.photoslibrary.mediaItems.search({
      albumId: id,
      pageToken: nextPageToken,
      pageSize: 100
    }).then(function (response) {
      images = images.concat(response.result.mediaItems.map(img => {
        return {
          id: img.id,
          baseUrl: `${img.baseUrl}=w${w}-h${h}`,
          new: false,
          viewed: false
        };
      }));
      return response.result.nextPageToken;
    }).catch(function (e) {
      return undefined;
    });
  };

  const response = await window.gapi.client.photoslibrary.albums.get({
    albumId: id
  });
  const album = response.result;
  var nextPageToken = null;
  var i = 0;

  while (images.length < Number(album.mediaItemsCount) && i < 5) {
    await getAlbumImageChunk(id, nextPageToken).then(token => nextPageToken = token);
    i++;
  }

  return images;
};

const loadImages = async function () {
  const albums = await loadAlbums();
  const result = albums.filter(a => {
    return a.title === 'PhotoAh';
  });

  if (result.length !== 1) {
    // TODO show user a message about creating album
    console.log("'Photo Frame' album not found");
    return;
  }

  return await getImages(result[0].id);
};



/***/ }),

/***/ "2f39":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/@quasar/extras/roboto-font/roboto-font.css
var roboto_font = __webpack_require__("7d6e");

// EXTERNAL MODULE: ./node_modules/@quasar/extras/material-icons/material-icons.css
var material_icons = __webpack_require__("e54f");

// EXTERNAL MODULE: ./node_modules/@quasar/extras/animate/fadeIn.css
var fadeIn = __webpack_require__("4848");

// EXTERNAL MODULE: ./node_modules/@quasar/extras/animate/fadeOut.css
var fadeOut = __webpack_require__("c382");

// EXTERNAL MODULE: ./node_modules/@quasar/extras/animate/bounceIn.css
var bounceIn = __webpack_require__("d67f");

// EXTERNAL MODULE: ./node_modules/@quasar/extras/animate/bounceOut.css
var bounceOut = __webpack_require__("b794");

// EXTERNAL MODULE: ./node_modules/quasar/dist/quasar.sass
var quasar = __webpack_require__("985d");

// EXTERNAL MODULE: ./src/css/app.sass
var css_app = __webpack_require__("0047");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: ./node_modules/quasar/lang/en-us.js
var en_us = __webpack_require__("1f91");

// EXTERNAL MODULE: ./node_modules/quasar/icon-set/material-icons.js
var icon_set_material_icons = __webpack_require__("42d2");

// EXTERNAL MODULE: ./node_modules/quasar/src/vue-plugin.js + 1 modules
var vue_plugin = __webpack_require__("b05d");

// EXTERNAL MODULE: ./node_modules/quasar/src/plugins/AppFullscreen.js
var AppFullscreen = __webpack_require__("b12a");

// EXTERNAL MODULE: ./node_modules/quasar/src/plugins/LocalStorage.js
var LocalStorage = __webpack_require__("18d6");

// EXTERNAL MODULE: ./node_modules/quasar/src/plugins/SessionStorage.js
var SessionStorage = __webpack_require__("a639");

// EXTERNAL MODULE: ./node_modules/quasar/src/plugins/Dialog.js + 7 modules
var Dialog = __webpack_require__("436b");

// EXTERNAL MODULE: ./node_modules/quasar/src/plugins/Loading.js
var Loading = __webpack_require__("f508");

// CONCATENATED MODULE: ./.quasar/import-quasar.js
/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/



;
vue_runtime_esm["a" /* default */].use(vue_plugin["a" /* default */], {
  config: {
    "loading": {}
  },
  lang: en_us["a" /* default */],
  iconSet: icon_set_material_icons["a" /* default */],
  plugins: {
    AppFullscreen: AppFullscreen["a" /* default */],
    LocalStorage: LocalStorage["a" /* default */],
    SessionStorage: SessionStorage["a" /* default */],
    Dialog: Dialog["a" /* default */],
    Loading: Loading["a" /* default */]
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@quasar/app/lib/webpack/loader.auto-import-client.js?kebab!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=4c22a6cd&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"q-app"}},[_c('router-view')],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=4c22a6cd&

// CONCATENATED MODULE: ./node_modules/@quasar/app/lib/webpack/loader.transform-quasar-imports.js!./node_modules/babel-loader/lib??ref--2-0!./node_modules/@quasar/app/lib/webpack/loader.auto-import-client.js?kebab!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js&
//
//
//
//
//
// global.jQuery = require('jquery')
// var $ = global.jQuery
// window.$ = $
/* harmony default export */ var Appvue_type_script_lang_js_ = ({
  name: 'App'
});
// CONCATENATED MODULE: ./src/App.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/App.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_Appvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var App = (component.exports);
// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm.js
var vue_router_esm = __webpack_require__("8c4f");

// CONCATENATED MODULE: ./src/router/routes.js

const routes = [{
  path: '/',
  component: () => Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, "713b")),
  children: [{
    path: 'settings',
    name: 'Settings',
    component: () => Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, "311b"))
  }, {
    path: '',
    name: 'Slideshow',
    component: () => Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, "32e7"))
  }]
}, // Always leave this as last one,
// but you can also remove it
{
  path: '*',
  component: () => Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(5)]).then(__webpack_require__.bind(null, "e51e"))
}];
/* harmony default export */ var router_routes = (routes);
// CONCATENATED MODULE: ./src/router/index.js



vue_runtime_esm["a" /* default */].use(vue_router_esm["a" /* default */]);
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

/* harmony default export */ var src_router = (function ()
/* { store, ssrContext } */
{
  const Router = new vue_router_esm["a" /* default */]({
    scrollBehavior: () => ({
      x: 0,
      y: 0
    }),
    routes: router_routes,
    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: "history",
    base: "/"
  });
  Router.beforeEach((to, from, next) => {
    document.title = `${to.name} | ${"PhotoAh"}`;
    next();
  });
  return Router;
});
// CONCATENATED MODULE: ./.quasar/app.js


/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/




/* harmony default export */ var _quasar_app = (async function () {
  // create store and router instances
  const router = typeof src_router === 'function' ? await src_router({
    Vue: vue_runtime_esm["a" /* default */]
  }) : src_router; // Create the app instantiation Object.
  // Here we inject the router, store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.

  const app = {
    router,
    render: h => h(App)
  };
  app.el = '#q-app'; // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.

  return {
    app,
    router
  };
});
// EXTERNAL MODULE: ./node_modules/register-service-worker/index.js
var register_service_worker = __webpack_require__("9483");

// CONCATENATED MODULE: ./src-pwa/register-service-worker.js
 // The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

Object(register_service_worker["a" /* register */])("/service-worker.js", {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter
  // registrationOptions: { scope: './' },
  ready()
  /* registration */
  {
    console.log('PHSW:Service worker is active.');
  },

  registered()
  /* registration */
  {
    console.log('PHSW:Service worker has been registered.');
  },

  cached()
  /* registration */
  {
    console.log('PHSW:Content has been cached for offline use.');
  },

  updatefound()
  /* registration */
  {
    console.log('PHSW:New content is downloading.');
  },

  updated()
  /* registration */
  {
    console.log('PHSW:New content is available; please refresh.');
  },

  offline() {
    console.log('PHSW:No internet connection found. App is running in offline mode.');
  },

  error(err) {
    console.error('PHSW:Error during service worker registration:', err);
  }

});
// EXTERNAL MODULE: ./src/boot/store.js + 2 modules
var boot_store = __webpack_require__("c60b");

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("bc3a");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./src/boot/axios.js


vue_runtime_esm["a" /* default */].prototype.$axios = axios_default.a;
// EXTERNAL MODULE: ./node_modules/quasar/wrappers/index.js
var wrappers = __webpack_require__("4bde");

// EXTERNAL MODULE: ./src/services/imageService.js
var imageService = __webpack_require__("1103");

// CONCATENATED MODULE: ./src/boot/g-auth.js




const SCOPE = 'https://www.googleapis.com/auth/photoslibrary.readonly';

function GAuth(store) {
  this.store = store;
  this.gapi = null;

  this.installClient = function installClient() {
    const apiUrl = 'https://apis.google.com/js/api.js';
    return new Promise(resolve => {
      var script = document.createElement('script');
      script.src = apiUrl;

      script.onreadystatechange = script.onload = function () {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
          setTimeout(function () {
            resolve();
          }, 500);
        }
      };

      document.getElementsByTagName('body')[0].appendChild(script);
    });
  };

  this.loadGapi = async function () {
    return new Promise((resolve, reject) => {
      window.gapi.load('client:auth2', () => {
        resolve(window.gapi);
      });
    });
  };

  this.setSigninStatus = async function () {
    if (this.authInstance == null) {
      store.isSignedIn = false;
      return;
    }

    const user = this.authInstance.currentUser.get();
    store.isSignedIn = user.hasGrantedScopes(SCOPE);

    if (store.isSignedIn) {
      await boot_store["a" /* actions */].loadImages(false);
    }
  };

  this.initClient = async function () {
    if (!store.authReady || !window.gapi) {
      await this.installClient();
      this.gapi = await this.loadGapi();
      store.authReady = true;
    }

    const apikey = store.apikey;
    if (!store.validApikey()) return;

    try {
      await this.gapi.client.init({
        apiKey: apikey,
        clientId: '773738037107-50714q5fdotjmh884clsghir2bljqj4t.apps.googleusercontent.com',
        discoveryDocs: ['https://photoslibrary.googleapis.com/$discovery/rest?version=v1'],
        scope: SCOPE
      });
    } catch (e) {
      console.log(e.error.message);
      boot_store["a" /* actions */].setApikey('');
      throw new Error('Invalid apikey.');
    }

    this.authInstance = this.gapi.auth2.getAuthInstance();
    this.authInstance.isSignedIn.listen(this.setSigninStatus.bind(this));
    this.setSigninStatus();
  };

  this.signIn = async function () {
    try {
      store.authInProgress = true;

      if (this.authInstance == null) {
        await this.initClient();
      }

      if (!this.authInstance.isSignedIn.get()) {
        await this.authInstance.signIn();
      }
    } finally {
      store.authInProgress = false;
    }
  };

  this.signOut = async function () {
    this.authInstance.signOut();
    this.authInstance = null;
    store.isSignedIn = false;
    store.images = [];
  };
}

/* harmony default export */ var g_auth = (Object(wrappers["boot"])(async ({
  Vue
}) => {
  Vue.prototype.$gAuth = new GAuth(boot_store["c" /* store */]);
}));
// CONCATENATED MODULE: ./.quasar/client-entry.js



/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/





 // We load Quasar stylesheet file









vue_runtime_esm["a" /* default */].config.devtools = true;
vue_runtime_esm["a" /* default */].config.productionTip = false; // Needed only for iOS PWAs

if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && window.navigator.standalone) {
  __webpack_require__.e(/* import() | fastclick */ 0).then(__webpack_require__.t.bind(null, "a0db", 7));
}

const publicPath = `/`;

async function start() {
  const {
    app,
    router
  } = await _quasar_app();
  let hasRedirected = false;

  const redirect = url => {
    hasRedirected = true;
    const normalized = Object(url) === url ? router.resolve(url).route.fullPath : url;
    window.location.href = normalized;
  };

  const urlPath = window.location.href.replace(window.location.origin, '');
  const bootFiles = [boot_store["default"], /* Cannot get final name for export "default" in "./src/boot/axios.js" (known exports: , known reexports: ) */ undefined, g_auth];

  for (let i = 0; hasRedirected === false && i < bootFiles.length; i++) {
    if (typeof bootFiles[i] !== 'function') {
      continue;
    }

    try {
      await bootFiles[i]({
        app,
        router,
        Vue: vue_runtime_esm["a" /* default */],
        ssrContext: null,
        redirect,
        urlPath,
        publicPath
      });
    } catch (err) {
      if (err && err.url) {
        window.location.href = err.url;
        return;
      }

      console.error('[Quasar] boot error:', err);
      return;
    }
  }

  if (hasRedirected === true) {
    return;
  }

  new vue_runtime_esm["a" /* default */](app);
}

start();

/***/ }),

/***/ "c60b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ store; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ actions; });

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__("c975");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: ./node_modules/quasar/src/plugins/LocalStorage.js
var LocalStorage = __webpack_require__("18d6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// CONCATENATED MODULE: ./src/utils/stringUtil.js


const empty = function empty(e) {
  if (typeof e === 'string') {
    e = e.trim();
  }

  switch (e) {
    case '':
    case 0:
    case '0':
    case null:
    case false:
    case typeof e === 'undefined':
      return true;

    default:
      return false;
  }
};


// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// CONCATENATED MODULE: ./src/utils/arrayUtil.js


const shuffle = function (arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};


// EXTERNAL MODULE: ./src/services/imageService.js
var imageService = __webpack_require__("1103");

// CONCATENATED MODULE: ./src/boot/store.js




;



const apikey = LocalStorage["a" /* default */].getItem('apikey');
const store = vue_runtime_esm["a" /* default */].observable({
  authReady: false,
  authInProgress: false,
  isSignedIn: false,
  images: [],
  imagesLoading: false,
  apikey: apikey,
  currentSlideIndex: 1,
  autoplay: 8000,
  newImages: false,
  validApikey: function () {
    return !empty(this.apikey);
  }
});
const actions = {
  setApikey: function (val) {
    if (val === 'null' || val === null) return;
    store.apikey = val;
    LocalStorage["a" /* default */].set('apikey', val);
  },
  setImages: function (val) {
    if (val === undefined || val.length === 0) {
      store.images = [];

      if (actions.albumMissingCb) {
        actions.albumMissingCb();
      }

      return;
    }

    let lsReadImageIds = LocalStorage["a" /* default */].getItem('readIds');
    lsReadImageIds = lsReadImageIds === null ? [] : lsReadImageIds; // Set the read flag on incoming images

    store.newImages = false;
    val.forEach(i => {
      i.new = lsReadImageIds.indexOf(i.id) === -1;
      i.updated = false;

      if (i.new) {
        store.newImages = true;
      }
    });

    if (store.images.length === 0) {
      // nothing to merge
      store.images = val;
      return;
    }

    for (var i = store.images.length - 1; i > -1; i--) {
      const newImage = val.find(v => v.id === store.images[i].id);

      if (newImage === undefined) {
        // if not in val splice it out
        store.images.splice(i, 1);
        console.log('deleted image');
      } else {
        // if exists in val, update it using splice
        if (store.images[i].baseUrl !== newImage.baseUrl || store.images[i].new !== newImage.new) {
          store.images[i].baseUrl = newImage.baseUrl;
          store.images[i].new = newImage.new;

          if (newImage.new) {
            store.newImages = true;
          }

          store.images.splice(i, 1, store.images[i]);
        }

        newImage.updated = true;
        console.log('updated image');
      }
    }

    const newImages = val.filter(i => !i.updated);

    if (newImages.length > 0) {
      const allImages = newImages.concat(store.images); // store.images.unshift(...newImages)

      store.images = allImages;
      store.currentSlideIndex = 0;
      store.newImages = true;
      console.log('inserted image');
    }
  },
  markImagesRead: function () {
    // set the current list of imageId{s in localStorage
    const ids = store.images.map(i => {
      i.new = false;
      return i.id;
    });
    LocalStorage["a" /* default */].set('readIds', ids);
    store.newImages = false;
  },
  shuffleImages: function () {
    store.images = shuffle(store.images);
    store.currentSlideIndex++;
    store.currentSlideIndex--;
  },
  loadImages: async function (background) {
    store.imagesLoading = !background;
    const images = await Object(imageService["a" /* loadImages */])();
    actions.setImages(images);
    store.imagesLoading = false;
  }
};
vue_runtime_esm["a" /* default */].prototype.$store = store;
vue_runtime_esm["a" /* default */].prototype.$actions = actions;

/***/ })

/******/ });
//# sourceMappingURL=app.da9ba665.js.map