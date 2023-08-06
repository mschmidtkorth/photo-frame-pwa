(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  [3],
  {
    /***/ "311b": /***/ function (
      module,
      __webpack_exports__,
      __webpack_require__
    ) {
      "use strict";
      // ESM COMPAT FLAG
      __webpack_require__.r(__webpack_exports__);

      // CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@quasar/app/lib/webpack/loader.auto-import-client.js?kebab!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/PageSettings.vue?vue&type=template&id=4b682461&
      var render = function () {
        var _vm = this;
        var _h = _vm.$createElement;
        var _c = _vm._self._c || _h;
        return _c(
          "q-page",
          { staticClass: "constrain q-pa-md" },
          [
            _c("q-btn", {
              staticClass: "full-width constrain-fw",
              attrs: {
                size: "xl",
                padding: "xl xl",
                color: "primary",
                rounded: "",
                icon: _vm.$store.validApikey() ? "check" : "warning",
                label: "Set API Key",
              },
              on: {
                click: function ($event) {
                  _vm.apikeyDialog = true;
                },
              },
            }),
            _c("q-btn", {
              staticClass: "full-width constrain-fw",
              attrs: {
                disable: _vm.apikey == "",
                size: "xl",
                padding: "xl xl",
                color: "primary",
                rounded: "",
                icon: _vm.$store.isSignedIn ? "check" : "warning",
                label: _vm.$store.isSignedIn
                  ? "Granted Photoah Access"
                  : "Authorize PhotoAh",
                loading: _vm.$store.authInProgress,
              },
              on: { click: _vm.setAuthStatus },
            }),
            _c(
              "div",
              { staticClass: "text-center" },
              [
                _c(
                  "q-banner",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value:
                          _vm.$store.images.length > 0 && _vm.$store.isSignedIn,
                        expression:
                          "$store.images.length > 0 && $store.isSignedIn",
                      },
                    ],
                    staticClass: "text-white bg-positive",
                    attrs: { "inline-actions": "", animated: "" },
                  },
                  [
                    _vm._v(
                      '\n      PhotoAh album has been loaded, click the "Slideshow" button to start\n      it.'
                    ),
                    _c("br"),
                    _vm._v(
                      "\n      TIP: Share the PhotoAh album with friends and family so they can add\n      photos to your album.\n    "
                    ),
                  ]
                ),
                _c(
                  "q-banner",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value:
                          !_vm.$store.authInProgress &&
                          _vm.$store.authReady &&
                          _vm.$store.isSignedIn &&
                          !_vm.$store.imagesLoading &&
                          _vm.$store.images.length === 0,
                        expression:
                          "\n        !$store.authInProgress &&\n          $store.authReady &&\n          $store.isSignedIn &&\n          !$store.imagesLoading &&\n          $store.images.length === 0\n      ",
                      },
                    ],
                    staticClass: "text-white bg-red",
                    attrs: { "inline-actions": "", animated: "" },
                  },
                  [
                    _vm._v(
                      '\n      PhotoAh album not found or it is empty, please create an album titled\n      "PhotoAh" in your\n      '
                    ),
                    _c(
                      "a",
                      {
                        attrs: {
                          href: "https://photos.google.com",
                          target: "_blank",
                        },
                      },
                      [_vm._v("Google Photos")]
                    ),
                    _vm._v("\n      and add at least 1 photo.\n    "),
                  ]
                ),
              ],
              1
            ),
            _c(
              "q-dialog",
              {
                model: {
                  value: _vm.apikeyDialog,
                  callback: function ($$v) {
                    _vm.apikeyDialog = $$v;
                  },
                  expression: "apikeyDialog",
                },
              },
              [
                _c(
                  "q-card",
                  { staticStyle: { "min-width": "350px" } },
                  [
                    _c("q-card-section", [
                      _c("div", { staticClass: "text-h6" }, [
                        _vm._v("API Key"),
                      ]),
                    ]),
                    _c(
                      "q-card-section",
                      { staticClass: "q-pt-none" },
                      [
                        _c("q-input", {
                          attrs: {
                            name: "apikey_field",
                            dense: "",
                            autofocus: "",
                          },
                          on: {
                            keyup: function ($event) {
                              if (
                                !$event.type.indexOf("key") &&
                                _vm._k(
                                  $event.keyCode,
                                  "enter",
                                  13,
                                  $event.key,
                                  "Enter"
                                )
                              ) {
                                return null;
                              }
                              return _vm.updateApikey();
                            },
                          },
                          model: {
                            value: _vm.apikey,
                            callback: function ($$v) {
                              _vm.apikey = $$v;
                            },
                            expression: "apikey",
                          },
                        }),
                      ],
                      1
                    ),
                    _c(
                      "q-card-actions",
                      {
                        staticClass: "text-primary",
                        attrs: { align: "right" },
                      },
                      [
                        _c("q-btn", {
                          directives: [
                            { name: "close-popup", rawName: "v-close-popup" },
                          ],
                          attrs: {
                            flat: "",
                            label: "Cancel",
                            color: "primary",
                          },
                        }),
                        _c("q-btn", {
                          directives: [
                            { name: "close-popup", rawName: "v-close-popup" },
                          ],
                          attrs: { flat: "", label: "Update API KEY" },
                          on: { click: _vm.updateApikey },
                        }),
                      ],
                      1
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
          ],
          1
        );
      };
      var staticRenderFns = [];

      // CONCATENATED MODULE: ./src/pages/PageSettings.vue?vue&type=template&id=4b682461&

      // EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
      var es_promise = __webpack_require__("e6cf");

      // EXTERNAL MODULE: ./src/boot/store.js + 2 modules
      var store = __webpack_require__("c60b");

      // CONCATENATED MODULE: ./node_modules/@quasar/app/lib/webpack/loader.transform-quasar-imports.js!./node_modules/babel-loader/lib??ref--2-0!./node_modules/@quasar/app/lib/webpack/loader.auto-import-client.js?kebab!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/PageSettings.vue?vue&type=script&lang=js&

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

      /* harmony default export */ var PageSettingsvue_type_script_lang_js_ = {
        name: "PageHome",

        data() {
          return {
            apikeyDialog: false,
            apikey: store["c" /* store */].apikey,
            $store: store["c" /* store */],
          };
        },

        methods: {
          updateApikey: function () {
            this.apikeyDialog = false;
            this.$actions.setApikey(this.apikey);
          },
          setAuthStatus: async function () {
            if ($store.isSignedIn) {
              this.$gAuth.signOut();
            } else {
              try {
                await this.$gAuth.signIn();
              } catch (e) {
                this.apikey = "";
                this.$q.dialog({
                  class: "warning",
                  message: "Invalid Api Key, please set a valid Api Key",
                });
              }
            }
          },
        },
      };
      // CONCATENATED MODULE: ./src/pages/PageSettings.vue?vue&type=script&lang=js&
      /* harmony default export */ var pages_PageSettingsvue_type_script_lang_js_ =
        PageSettingsvue_type_script_lang_js_;
      // EXTERNAL MODULE: ./src/pages/PageSettings.vue?vue&type=style&index=0&lang=css&
      var PageSettingsvue_type_style_index_0_lang_css_ =
        __webpack_require__("9d26");

      // EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
      var componentNormalizer = __webpack_require__("2877");

      // EXTERNAL MODULE: ./node_modules/quasar/src/components/page/QPage.js
      var QPage = __webpack_require__("9989");

      // EXTERNAL MODULE: ./node_modules/quasar/src/components/btn/QBtn.js + 1 modules
      var QBtn = __webpack_require__("9c40");

      // EXTERNAL MODULE: ./node_modules/quasar/src/components/banner/QBanner.js
      var QBanner = __webpack_require__("54e1");

      // EXTERNAL MODULE: ./node_modules/quasar/src/components/dialog/QDialog.js + 3 modules
      var QDialog = __webpack_require__("24e8");

      // EXTERNAL MODULE: ./node_modules/quasar/src/components/card/QCard.js
      var QCard = __webpack_require__("f09f");

      // EXTERNAL MODULE: ./node_modules/quasar/src/components/card/QCardSection.js
      var QCardSection = __webpack_require__("a370");

      // EXTERNAL MODULE: ./node_modules/quasar/src/components/input/QInput.js + 7 modules
      var QInput = __webpack_require__("27f9");

      // EXTERNAL MODULE: ./node_modules/quasar/src/components/card/QCardActions.js
      var QCardActions = __webpack_require__("4b7e");

      // EXTERNAL MODULE: ./node_modules/quasar/src/components/table/QTr.js
      var QTr = __webpack_require__("bd08");

      // EXTERNAL MODULE: ./node_modules/quasar/src/directives/ClosePopup.js
      var ClosePopup = __webpack_require__("7f67");

      // EXTERNAL MODULE: ./node_modules/@quasar/app/lib/webpack/runtime.auto-import.js
      var runtime_auto_import = __webpack_require__("eebe");
      var runtime_auto_import_default =
        /*#__PURE__*/ __webpack_require__.n(runtime_auto_import);

      // CONCATENATED MODULE: ./src/pages/PageSettings.vue

      /* normalize component */

      var component = Object(componentNormalizer["a" /* default */])(
        pages_PageSettingsvue_type_script_lang_js_,
        render,
        staticRenderFns,
        false,
        null,
        null,
        null
      );

      /* harmony default export */ var PageSettings = (__webpack_exports__[
        "default"
      ] = component.exports);

      runtime_auto_import_default()(component, "components", {
        QPage: QPage["a" /* default */],
        QBtn: QBtn["a" /* default */],
        QBanner: QBanner["a" /* default */],
        QDialog: QDialog["a" /* default */],
        QCard: QCard["a" /* default */],
        QCardSection: QCardSection["a" /* default */],
        QInput: QInput["a" /* default */],
        QCardActions: QCardActions["a" /* default */],
        QTr: QTr["a" /* default */],
      });
      runtime_auto_import_default()(component, "directives", {
        ClosePopup: ClosePopup["a" /* default */],
      });

      /***/
    },

    /***/ "449f": /***/ function (module, exports, __webpack_require__) {
      // extracted by mini-css-extract-plugin
      /***/
    },

    /***/ "9d26": /***/ function (
      module,
      __webpack_exports__,
      __webpack_require__
    ) {
      "use strict";
      /* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_2_2_node_modules_quasar_app_lib_webpack_loader_auto_import_client_js_kebab_node_modules_vue_loader_lib_index_js_vue_loader_options_PageSettings_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__("449f");
      /* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_2_2_node_modules_quasar_app_lib_webpack_loader_auto_import_client_js_kebab_node_modules_vue_loader_lib_index_js_vue_loader_options_PageSettings_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/ __webpack_require__.n(
          _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_2_2_node_modules_quasar_app_lib_webpack_loader_auto_import_client_js_kebab_node_modules_vue_loader_lib_index_js_vue_loader_options_PageSettings_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__
        );
      /* unused harmony reexport * */

      /***/
    },
  },
]);
//# sourceMappingURL=3.7c913698.js.map
