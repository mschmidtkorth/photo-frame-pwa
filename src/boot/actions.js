import Vue from 'vue'
import { shuffle } from '../utils/arrayUtil'
import { loadImages } from '../services/imageService'
import { LocalStorage } from 'quasar'
import { store } from './store'
import { gauth } from './g-auth'

export const actions = {
  setLocalStorage: function (key, val) {
    if (val === 'null' || val === null) return
    store[key] = val
    LocalStorage.set(key, val)
  },

  setImages: function (val) {
    if (val === undefined || val.length === 0) {
      store.images = []
      if (actions.albumMissingCb) {
        actions.albumMissingCb()
      }
      return
    }
    let lsReadImageIds = LocalStorage.getItem('readIds')
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
      actions.setLocalStorage('images', val)
      return
    }
    for (var i = store.images.length - 1; i > -1; i--) {
      const newImage = val.find(v => v.id === store.images[i].id)
      if (newImage === undefined) {
        // if not in val splice it out
        store.images.splice(i, 1)
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
      }
    }
    const newImages = val.filter(i => !i.updated)

    if (newImages.length > 0) {
      const allImages = newImages.concat(store.images)
      store.images = allImages
      store.currentSlideIndex = 0
      store.newImages = true
    }
    actions.setLocalStorage('images', val)
  },
  markImagesRead: function () {
    const ids = store.images.map(i => {
      i.new = false
      return i.id
    })
    LocalStorage.set('readIds', ids)
    store.newImages = false
  },
  shuffleImages: function () {
    store.images = shuffle(store.images)
    store.currentSlideIndex++
    store.currentSlideIndex--
  },
  _loadImages: async function () {
    const images =
      (await loadImages(store.albumTitle, store.isSharedAlbum)) ?? []
    actions.setImages(images)
    store.imagesLoading = false
    if (images.length > 0) {
      store.albumLoaded = true
    }
  },
  loadImages: async function () {
    if (!navigator.onLine) {
      if (store.images.length > 0) {
        store.albumLoaded = true
      }
      return
    }
    store.imagesLoading = true
    try {
      await this._loadImages()
    } catch (e) {
      await gauth.initClient()
      if (store.isSignedIn) {
        await this._loadImages()
      }
    }
    store.imagesLoading = false
  }
}

Vue.prototype.$actions = actions
