(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "32e7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@quasar/app/lib/webpack/loader.auto-import-client.js?kebab!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/PageSlideshow.vue?vue&type=template&id=6c9aa493&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{},[_c('q-carousel',{attrs:{"swipeable":"","autoplay":_vm.$store.autoplay,"transition-next":"slide-fade","transition-prev":"slide-fade","fullscreen":_vm.fullscreen,"animated":"","infinite":"","height":_vm.windowHeight},on:{"update:fullscreen":function($event){_vm.fullscreen=$event},"click":_vm.showControls},scopedSlots:_vm._u([{key:"control",fn:function(){return [_c('q-carousel-control',{class:_vm.controlClass,attrs:{"position":"top-right","offset":[60, 300]}},[_c('q-btn',{attrs:{"push":"","square":"","dense":"","color":"grey","size":"xl","text-color":"white","icon":_vm.fullscreen ? 'fullscreen_exit' : 'fullscreen'},on:{"click":_vm.toggleFullScreen}})],1),_c('q-carousel-control',{staticClass:"text-white rounded-borders",class:_vm.controlClass,staticStyle:{"background":"rgba(0, 0, 0, .3)","padding":"4px 8px","font-size":"24px"},attrs:{"position":"top-right","offset":[160, 60]}},[_c('q-toggle',{attrs:{"dense":"","dark":"","color":"orange","label":'Only New (' + _vm.newImageCt + ')'},model:{value:(_vm.newImagesOnly),callback:function ($$v) {_vm.newImagesOnly=$$v},expression:"newImagesOnly"}})],1),_c('q-carousel-control',{class:_vm.controlClass,attrs:{"position":"top-right","offset":[60, 60]}},[_c('q-btn',{attrs:{"push":"","square":"","size":"xl","dense":"","color":"grey","text-color":"white","icon":_vm.$store.autoplay === 0 ? 'play_arrow' : 'pause'},on:{"click":function($event){_vm.$store.autoplay = _vm.$store.autoplay === 0 ? 8000 : 0}}})],1),_c('q-carousel-control',{class:_vm.controlClass,attrs:{"position":"top-right","offset":[60, 140]}},[_c('q-btn',{attrs:{"push":"","square":"","size":"xl","dense":"","color":"grey","text-color":"white","icon":_vm.$store.newImages ? 'check' : 'cached'},on:{"click":function($event){_vm.$store.newImages
              ? _vm.$actions.markImagesRead()
              : _vm.$actions.loadImages(false)}}})],1),_c('q-carousel-control',{class:_vm.controlClass,attrs:{"position":"top-right","offset":[60, 220]}},[_c('q-btn',{attrs:{"push":"","square":"","size":"xl","dense":"","color":"grey","text-color":"white","icon":"shuffle"},on:{"click":_vm.shuffleImages}})],1),_c('q-carousel-control',{attrs:{"position":"bottom-left","offset":[0, 18]}},[_c('q-btn',{class:{ hidden: !_vm.$store.newImages },attrs:{"square":"","size":"md","dense":"","text-color":"warning","icon":"new_releases"}})],1)]},proxy:true}]),model:{value:(_vm.$store.currentSlideIndex),callback:function ($$v) {_vm.$set(_vm.$store, "currentSlideIndex", $$v)},expression:"$store.currentSlideIndex"}},_vm._l((_vm.images),function(img,index){return _c('q-carousel-slide',{key:index,attrs:{"name":index,"img-src":img.baseUrl}})}),1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/PageSlideshow.vue?vue&type=template&id=6c9aa493&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./src/boot/store.js + 2 modules
var store = __webpack_require__("c60b");

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("bc3a");

// CONCATENATED MODULE: ./node_modules/@quasar/app/lib/webpack/loader.transform-quasar-imports.js!./node_modules/babel-loader/lib??ref--2-0!./node_modules/@quasar/app/lib/webpack/loader.auto-import-client.js?kebab!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/PageSlideshow.vue?vue&type=script&lang=js&

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


let timeout = null;
let updateTimeout = null;
let wakeLock = null;

const requestWakeLock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', () => {
      console.log('Screen Wake Lock released:', wakeLock.released);
    });
    console.log('Screen Wake Lock released:', wakeLock.released);
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
};

const handleVisibilityChange = async () => {
  if (wakeLock !== null && document.visibilityState === 'visible') {
    await requestWakeLock();

    if (store["c" /* store */].registration && !store["c" /* store */].registration.waiting) {
      store["c" /* store */].registration.update();
    }
  }
};

document.addEventListener('visibilitychange', handleVisibilityChange);
/* harmony default export */ var PageSlideshowvue_type_script_lang_js_ = ({
  data() {
    return {
      controlClass: 'hidden',
      windowHeight: 0,
      fullscreen: false,
      $store: store["c" /* store */],
      $actions: store["a" /* actions */],
      interval: null,
      newImagesOnly: false
    };
  },

  computed: {
    images() {
      if (this.$store.images.length > 0) {
        this.$q.loading.hide();
      }

      if (this.newImagesOnly) {
        const images = this.$store.images.filter(i => i.new);

        if (images.length === 0) {
          images.push({
            id: 'no-images',
            baseUrl: 'images/no-images.png'
          });
        }

        return images;
      }

      return this.$store.images;
    },

    allowFullScreen() {
      return this.fullscreen && !this.$store.showAppUpdatedBanner;
    },

    newImageColor() {
      return this.$store.newImages ? 'warning' : '';
    },

    newImageCt() {
      const images = this.$store.images.filter(i => {
        return i.new && i.id !== 'no-images';
      });
      return images.length;
    }

  },
  watch: {
    images: function (val) {
      if (this.$store.currentSlideIndex > val.length) {
        this.$store.currentSlideIndex = 0;
      }
    },
    allowFullScreen: function (val) {
      if (!val && this.fullscreen) {
        this.toggleFullScreen();
      }
    }
  },
  methods: {
    showControls: function () {
      this.controlClass = '';

      if (timeout) {
        clearTimeout(timeout); // cancel the previous timer.

        timeout = null;
      }

      timeout = setTimeout(function () {
        this.controlClass = 'hidden';
        clearTimeout(this.timeout = null);
      }.bind(this), 5000);
    },
    toggleFullScreen: function () {
      this.fullscreen = !this.fullscreen;

      if (this.$q.fullscreen.isActive !== this.fullscreen) {
        this.$q.fullscreen.toggle();
      }
    },
    shuffleImages: function () {
      this.$actions.shuffleImages();
    },
    onlyNew: function () {
      this.newImagesOnly = !this.newImagesOnly;
      this.$store.currentSlideIndex = 0;
    }
  },

  async created() {
    this.windowHeight = window.innerHeight - 124 + 'px';
    this.$q.loading.show();

    if ('wakeLock' in navigator) {
      await requestWakeLock();
    } else {
      // alert('Wake lock not supported')
      console.log('wakelock:', 'wakeLock' in navigator);
    }

    updateTimeout = setInterval(function () {
      if (store["c" /* store */].registration && !store["c" /* store */].registration.waiting) {
        store["c" /* store */].registration.update();
      }
    }, 1000 * 60);
  },

  async beforeDestroy() {
    if ('wakeLock' in navigator) {
      wakeLock.release(); // wakeLock = null
    }

    if (updateTimeout) {
      clearInterval(updateTimeout);
    }
  }

});
// CONCATENATED MODULE: ./src/pages/PageSlideshow.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_PageSlideshowvue_type_script_lang_js_ = (PageSlideshowvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/pages/PageSlideshow.vue?vue&type=style&index=0&lang=css&
var PageSlideshowvue_type_style_index_0_lang_css_ = __webpack_require__("c7f6");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/carousel/QCarousel.js + 2 modules
var QCarousel = __webpack_require__("880c");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/carousel/QCarouselSlide.js
var QCarouselSlide = __webpack_require__("62cd");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/carousel/QCarouselControl.js
var QCarouselControl = __webpack_require__("32a7");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/btn/QBtn.js + 1 modules
var QBtn = __webpack_require__("9c40");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/toggle/QToggle.js
var QToggle = __webpack_require__("9564");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/table/QTr.js
var QTr = __webpack_require__("bd08");

// EXTERNAL MODULE: ./node_modules/@quasar/app/lib/webpack/runtime.auto-import.js
var runtime_auto_import = __webpack_require__("eebe");
var runtime_auto_import_default = /*#__PURE__*/__webpack_require__.n(runtime_auto_import);

// CONCATENATED MODULE: ./src/pages/PageSlideshow.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_PageSlideshowvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PageSlideshow = __webpack_exports__["default"] = (component.exports);







runtime_auto_import_default()(component, 'components', {QCarousel: QCarousel["a" /* default */],QCarouselSlide: QCarouselSlide["a" /* default */],QCarouselControl: QCarouselControl["a" /* default */],QBtn: QBtn["a" /* default */],QToggle: QToggle["a" /* default */],QTr: QTr["a" /* default */]});


/***/ }),

/***/ "b524":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c7f6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_2_2_node_modules_quasar_app_lib_webpack_loader_auto_import_client_js_kebab_node_modules_vue_loader_lib_index_js_vue_loader_options_PageSlideshow_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b524");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_2_2_node_modules_quasar_app_lib_webpack_loader_auto_import_client_js_kebab_node_modules_vue_loader_lib_index_js_vue_loader_options_PageSlideshow_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_2_2_node_modules_quasar_app_lib_webpack_loader_auto_import_client_js_kebab_node_modules_vue_loader_lib_index_js_vue_loader_options_PageSlideshow_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);
//# sourceMappingURL=4.c746ffad.js.map