import Vue from 'vue'
import { LocalStorage } from 'quasar'
import { empty } from '../utils/stringUtil'
import { shuffle } from '../utils/arrayUtil'
import { loadImages } from '../services/imageService'

const apikey = LocalStorage.getItem('apikey')

export const store = Vue.observable({
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
    return !empty(this.apikey)
  }
})
export const actions = {
  setApikey: function (val) {
    if (val === 'null' || val === null) return
    store.apikey = val
    LocalStorage.set('apikey', val)
  },
  setImages: function (val) {
    if (val === undefined || val.length === 0) {
      store.images = []
      if (actions.albumMissingCb) {
        actions.albumMissingCb()
      }
      return
    }
    let lsReadImageIds = LocalStorage.getItem('images')
    lsReadImageIds = lsReadImageIds === null ? [] : lsReadImageIds

    // Set the read flag on incoming images
    store.newImages = false
    val.forEach(i => {
      i.new = lsReadImageIds.indexOf(i.id) === -1
      i.updated = false
      if (i.new) {
        store.newImages = true
      }
    })

    if (store.images.length === 0) {
      // nothing to merge
      store.images = val
      return
    }
    for (var i = store.images.length - 1; i > -1; i--) {
      const newImage = val.find(v => v.id === store.images[i].id)
      if (newImage === undefined) {
        // if not in val splice it out
        store.images.splice(i, 1)
        console.log('deleted image')
      } else {
        // if exists in val, update it using splice
        if (
          store.images[i].baseUrl !== newImage.baseUrl ||
          store.images[i].new !== newImage.new
        ) {
          store.images[i].baseUrl = newImage.baseUrl
          store.images[i].new = newImage.new
          if (newImage.new) {
            store.newImages = true
          }
          store.images.splice(i, 1, store.images[i])
        }
        newImage.updated = true
        console.log('updated image')
      }
    }
    const newImages = val.filter(i => !i.updated)

    if (newImages.length > 0) {
      const allImages = newImages.concat(store.images)
      // store.images.unshift(...newImages)
      store.images = allImages
      store.currentSlideIndex = 0
      store.newImages = true
      console.log('inserted image')
    }
  },
  shuffleImages: function () {
    store.images = shuffle(store.images)
    store.currentSlideIndex++
  },
  loadImages: async function (background) {
    store.imagesLoading = !background
    const images = await loadImages()
    actions.setImages(images)
    store.imagesLoading = false
  }
}

Vue.prototype.$store = store
Vue.prototype.$actions = actions
