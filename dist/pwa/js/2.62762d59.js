(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "0668":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "713b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@quasar/app/lib/webpack/loader.auto-import-client.js?kebab!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/MainLayout.vue?vue&type=template&id=362eea5b&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-layout',{attrs:{"view":"lHh Lpr lFf"}},[_c('q-header',{staticClass:"bg-primary text-grey-10",attrs:{"bordered":""}},[_c('q-toolbar',{staticClass:"constrain"},[_c('q-toolbar-title',{staticClass:"text-bold text-fredoka-one text-white"},[_vm._v("\n        Photo"),_c('span',{staticStyle:{"font-style":"italic"}},[_vm._v("Ahhhhhttttt")])])],1)],1),_c('q-footer',{staticClass:"bg-white"},[[_c('transition',{attrs:{"appear":"","enter-active-class":"animated bounceIn","leave-active-class":"animated fadeOut"}},[(_vm.showAppInstallBanner)?_c('div',{staticClass:"banner-container bg-primary"},[_c('div',{staticClass:"constrain-banner"},[_c('q-banner',{staticClass:"bg-primary text-white",attrs:{"dense":"","inline-actions":""},scopedSlots:_vm._u([{key:"avatar",fn:function(){return [_c('q-avatar',{attrs:{"name":"signal_wifi_off","color":"primary","icon":"system_update","font-size":"22px"}})]},proxy:true},{key:"action",fn:function(){return [_c('q-btn',{staticClass:"q-px-sm",attrs:{"dense":"","flat":"","label":"Yes"},on:{"click":_vm.installApp}}),_c('q-btn',{staticClass:"q-px-sm",attrs:{"dense":"","flat":"","label":"Later"},on:{"click":function($event){_vm.showAppInstallBanner = false}}}),_c('q-btn',{staticClass:"q-px-sm",attrs:{"dense":"","flat":"","label":"Never"},on:{"click":_vm.neverShowAppInstallBanner}})]},proxy:true}],null,false,2734498194)},[_c('b',[_vm._v("Install PhotoAh?")])])],1)]):_vm._e()])],_c('q-tabs',{staticClass:"text-grey-10",attrs:{"active-color":"primary","indicator-color":"transparent"},model:{value:(_vm.tab),callback:function ($$v) {_vm.tab=$$v},expression:"tab"}},[_c('q-route-tab',{attrs:{"to":"/","name":"slideshow","icon":"panorama","label":"Slideshow","disable":_vm.$store.images.length === 0}}),_c('q-route-tab',{attrs:{"to":"/settings","name":"settings","icon":"settings","label":"Settings"}}),_c('q-route-tab',{attrs:{"to":"/help","name":"help","icon":"support","label":"Help"}})],1)],2),_c('q-page-container',{staticClass:"bg-grey-1"},[_c('router-view')],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/layouts/MainLayout.vue?vue&type=template&id=362eea5b&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url.js
var web_url = __webpack_require__("2b3d");

// EXTERNAL MODULE: ./src/boot/store.js + 2 modules
var store = __webpack_require__("c60b");

// CONCATENATED MODULE: ./node_modules/@quasar/app/lib/webpack/loader.transform-quasar-imports.js!./node_modules/babel-loader/lib??ref--2-0!./node_modules/@quasar/app/lib/webpack/loader.auto-import-client.js?kebab!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/MainLayout.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

let deferredPrompt;
let bannerHasBeenShown = false;
/* harmony default export */ var MainLayoutvue_type_script_lang_js_ = ({
  name: 'MainLayout',

  data() {
    return {
      tab: 'settings',
      showAppInstallBanner: false,
      $store: store["c" /* store */]
    };
  },

  methods: {
    installApp() {
      this.showAppInstallBanner = false; // Show the install prompt

      deferredPrompt.prompt(); // Wait for the user to respond to the prompt

      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          this.neverShowAppInstallBanner();
        } else {
          console.log('User dismissed the install prompt');
        }
      });
    },

    neverShowAppInstallBanner() {
      this.showAppInstallBanner = false;
      this.$q.localStorage.set('neverShowInstall', true);
    },

    albumMissingCb() {
      if (this.$router.currentRoute.name !== 'Settings') {
        this.$router.push({
          name: 'Settings'
        });
      }

      this.$q.loading.hide();
    }

  },

  created() {
    this.$actions.albumMissingCb = this.albumMissingCb;
  },

  async mounted() {
    // Object.defineProperty(navigator, 'onLine', { value: false })
    this.interval = setInterval(async () => {
      // call _loadimages every 30 minutes
      await this.$actions.loadImages(false);
    }, 1800000);

    if (!this.$store.authReady || this.$store.images.length === 0) {
      // check for valid api key, if not try to load from url
      if (!this.$store.validApikey()) {
        var urlParams = new URLSearchParams(window.location.search);

        if (urlParams.has('apikey')) {
          this.$actions.setApikey(urlParams.get('apikey'));
          window.location.replace(window.location.origin);
        }
      }

      try {
        await this.$gAuth.initClient();
      } catch (e) {
        console.log('error: ' + e.message);
      }

      if (!this.$store.authReady || !this.$store.isSignedIn && navigator.onLine) {
        this.albumMissingCb();
      }
    }

    const neverShowInstall = this.$q.localStorage.getItem('neverShowInstall');

    if (!neverShowInstall) {
      window.addEventListener('beforeinstallprompt', e => {
        if (bannerHasBeenShown === true) return; // Prevent the mini-infobar from appearing on mobile

        e.preventDefault(); // Stash the event so it can be triggered later.

        deferredPrompt = e;
        bannerHasBeenShown = true; // Update UI notify the user they can install the PWA

        setTimeout(() => {
          this.showAppInstallBanner = true;
        }, 3000);
      });
    }
  }

});
// CONCATENATED MODULE: ./src/layouts/MainLayout.vue?vue&type=script&lang=js&
 /* harmony default export */ var layouts_MainLayoutvue_type_script_lang_js_ = (MainLayoutvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/layouts/MainLayout.vue?vue&type=style&index=0&lang=sass&
var MainLayoutvue_type_style_index_0_lang_sass_ = __webpack_require__("83ec");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/layout/QLayout.js + 1 modules
var QLayout = __webpack_require__("4d5a");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/header/QHeader.js
var QHeader = __webpack_require__("e359");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/toolbar/QToolbar.js
var QToolbar = __webpack_require__("65c6");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/toolbar/QToolbarTitle.js
var QToolbarTitle = __webpack_require__("6ac5");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/footer/QFooter.js
var QFooter = __webpack_require__("7ff0");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/banner/QBanner.js
var QBanner = __webpack_require__("54e1");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/avatar/QAvatar.js
var QAvatar = __webpack_require__("cb32");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/btn/QBtn.js + 1 modules
var QBtn = __webpack_require__("9c40");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/tabs/QTabs.js
var QTabs = __webpack_require__("429b");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/tabs/QRouteTab.js + 3 modules
var QRouteTab = __webpack_require__("7867");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/page/QPageContainer.js
var QPageContainer = __webpack_require__("09e3");

// EXTERNAL MODULE: ./node_modules/@quasar/app/lib/webpack/runtime.auto-import.js
var runtime_auto_import = __webpack_require__("eebe");
var runtime_auto_import_default = /*#__PURE__*/__webpack_require__.n(runtime_auto_import);

// CONCATENATED MODULE: ./src/layouts/MainLayout.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  layouts_MainLayoutvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var MainLayout = __webpack_exports__["default"] = (component.exports);












runtime_auto_import_default()(component, 'components', {QLayout: QLayout["a" /* default */],QHeader: QHeader["a" /* default */],QToolbar: QToolbar["a" /* default */],QToolbarTitle: QToolbarTitle["a" /* default */],QFooter: QFooter["a" /* default */],QBanner: QBanner["a" /* default */],QAvatar: QAvatar["a" /* default */],QBtn: QBtn["a" /* default */],QTabs: QTabs["a" /* default */],QRouteTab: QRouteTab["a" /* default */],QPageContainer: QPageContainer["a" /* default */]});


/***/ }),

/***/ "83ec":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_quasar_app_lib_webpack_loader_quasar_sass_variables_js_node_modules_quasar_app_lib_webpack_loader_auto_import_client_js_kebab_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0668");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_quasar_app_lib_webpack_loader_quasar_sass_variables_js_node_modules_quasar_app_lib_webpack_loader_auto_import_client_js_kebab_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_quasar_app_lib_webpack_loader_quasar_sass_variables_js_node_modules_quasar_app_lib_webpack_loader_auto_import_client_js_kebab_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);
//# sourceMappingURL=2.62762d59.js.map