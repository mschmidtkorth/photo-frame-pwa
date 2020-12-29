import Vue from 'vue'
import { shuffle } from '../utils/arrayUtil'
import { loadImages } from '../services/imageService'
import { LocalStorage } from 'quasar'
import { store } from './store'
import { gauth } from './g-auth'

export const actions = {
  store: store,
  setLocalStorage: function (key, val) {
    if (val === 'null' || val === null) return
    store[key] = val
    LocalStorage.set(key, val)
  },

  setImages: function (val) {
    if (val === undefined || val.length === 0) {
      this.store.images = []
      if (actions.albumMissingCb) {
        actions.albumMissingCb()
      }
      return
    }
    let lsReadImageIds = LocalStorage.getItem('readIds')
    lsReadImageIds = lsReadImageIds === null ? [] : lsReadImageIds

    // Set the read flag on incoming images
    this.store.newImages = false
    val.forEach(i => {
      i.new = lsReadImageIds.indexOf(i.id) === -1
      i.updated = false
      if (i.new) {
        this.store.newImages = true
      }
    })

    if (this.store.images.length === 0) {
      // nothing to merge
      this.store.images = val
      actions.setLocalStorage('images', val)
      return
    }
    for (var i = this.store.images.length - 1; i > -1; i--) {
      const newImage = val.find(v => v.id === this.store.images[i].id)
      if (newImage === undefined) {
        // if not in val splice it out
        this.store.images.splice(i, 1)
      } else {
        // if exists in val, update it using splice
        if (
          this.store.images[i].baseUrl !== newImage.baseUrl ||
          this.store.images[i].new !== newImage.new
        ) {
          this.store.images[i].baseUrl = newImage.baseUrl
          this.store.images[i].new = newImage.new
          if (newImage.new) {
            this.store.newImages = true
          }
          this.store.images.splice(i, 1, this.store.images[i])
        }
        newImage.updated = true
      }
    }
    const newImages = val.filter(i => !i.updated)

    if (newImages.length > 0) {
      const allImages = newImages.concat(this.store.images)
      this.store.images = allImages
      this.store.currentSlideIndex = 0
      this.store.newImages = true
    }
    actions.setLocalStorage('images', val)
  },
  markImagesRead: function () {
    const ids = this.store.images.map(i => {
      i.new = false
      return i.id
    })
    LocalStorage.set('readIds', ids)
    this.store.newImages = false
  },
  shuffleImages: function () {
    this.store.images = shuffle(this.store.images)
    this.store.currentSlideIndex++
    this.store.currentSlideIndex--
  },
  _loadImages: async function () {
    const images =
      (await loadImages(this.store.albumTitle, this.store.isSharedAlbum)) ?? []
    actions.setImages(images)
    this.store.imagesLoading = false
    this.store.albumLoaded = images.length > 0
  },
  loadImages: async function () {
    if (!navigator.onLine) {
      this.store.albumLoaded = this.store.images.length > 0
      return
    }
    this.store.imagesLoading = true
    try {
      await this._loadImages()
    } catch (e) {
      await gauth.initClient()
      if (this.store.isSignedIn) {
        await this._loadImages()
      } else {
        this.store.albumLoaded = this.store.images.length > 0
      }
    }
    this.store.imagesLoading = false
  }
}

Vue.prototype.$actions = actions
