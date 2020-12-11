import { store } from '../boot/store'

const shuffle = function (arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
const loadAlbums = function () {
  return window.gapi.client.photoslibrary.albums
    .list({})
    .then(function (fullResponse) {
      const albums = fullResponse.result.albums
      return albums
    })
}
const getImages = async function (id) {
  let images = []
  const getAlbumImageChunk = function (id, nextPageToken) {
    const h = window.innerHeight
    const w = window.innerWidth

    return window.gapi.client.photoslibrary.mediaItems
      .search({ albumId: id, pageToken: nextPageToken, pageSize: 100 })
      .then(function (response) {
        images = images.concat(
          response.result.mediaItems.map(img => {
            return `${img.baseUrl}=w${w}-h${h}`
          })
        )
        return response.result.nextPageToken
      })
      .catch(function (e) {
        return undefined
      })
  }
  const response = await window.gapi.client.photoslibrary.albums.get({
    albumId: id
  })
  const album = response.result
  var nextPageToken = null
  var i = 0
  while (images.length < Number(album.mediaItemsCount) && i < 5) {
    await getAlbumImageChunk(id, nextPageToken).then(
      token => (nextPageToken = token)
    )
    i++
  }
  return images
}
const loadImages = async function () {
  store.imagesLoading = true
  try {
    const albums = await loadAlbums()
    const result = albums.filter(a => {
      return a.title === 'PhotoAh'
    })
    if (result.length !== 1) {
      // TODO show user a message about creating album
      console.log("'Photo Frame' album not found")
      return
    }
    const loadedImages = await getImages(result[0].id)
    if (loadedImages) {
      store.images = loadedImages
    }
    // self.slick = $('.carousel').slick(self.slickSettings)
    console.log(`Found ${store.images.length} images`)
  } finally {
    store.imagesLoading = false
  }
}
const shuffleImages = function () {
  store.images = shuffle(store.images)
}

export { loadImages, shuffleImages }
