// import Vue from vue'

import { reactive } from "vue";
import { LocalStorage } from "quasar";
import { empty } from "../utils/stringUtil";

export const store = reactive({
  // export const store = Vue.observable({
  authReady: false,
  authInProgress: false,
  isSignedIn: false,
  images: LocalStorage.getItem("images") ?? [],
  imagesLoading: false,
  albumLoaded: false,
  albumTitleChanged: false,
  slideSpeed: LocalStorage.getItem("slideSpeed") ?? 8,
  autoplay: true,
  apikey: LocalStorage.getItem("apikey"),
  currentSlideIndex: 1,
  newImages: false,
  showAppUpdatedBanner: false,
  registration: null,
  appName: "Hello",
  albumTitle: LocalStorage.getItem("albumTitle") ?? "PhotoAh",
  isSharedAlbum: LocalStorage.getItem("isSharedAlbum") ?? false,
  onLine: navigator.onLine,
  logs: [],
  validApikey: function () {
    return !empty(this.apikey);
  },
});
window.ononline = () => (store.onLine = true);
window.onoffline = () => (store.onLine = false);

// Vue.prototype.$store = store
