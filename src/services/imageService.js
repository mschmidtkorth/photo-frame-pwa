window.photoFrame = window.photoFrame || {}

function ViewModel () {
  var self = this
  self.gapiClient = null
  self.images = []
  self.initialized = false
  self.shuffle = function shuffleArray (arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }
  self.loadAlbums = function () {
    return self.gapiClient.photoslibrary.albums
      .list({})
      .then(function (fullResponse) {
        const albums = fullResponse.result.albums
        return albums
      })
  }
  self.getAlbumImageChunk = function (id, nextPageToken) {
    return self.gapiClient.photoslibrary.mediaItems
      .search({ albumId: id, pageToken: nextPageToken, pageSize: 100 })
      .then(function (response) {
        self.images = self.images.concat(response.result.mediaItems)
        return response.result.nextPageToken
      })
      .catch(function (e) {
        return undefined
      })
  }
  self.getImages = async function (id) {
    const response = await self.gapiClient.photoslibrary.albums.get({
      albumId: id
    })
    const album = response.result
    var nextPageToken = null
    var i = 0
    while (self.images.length < Number(album.mediaItemsCount) && i < 5) {
      await self
        .getAlbumImageChunk(id, nextPageToken)
        .then(token => (nextPageToken = token))
      i++
    }
  }
  self.init = async function () {
    self.gapiClient = window.gapi.client
    const albums = await self.loadAlbums()
    const result = albums.filter(a => {
      return a.title === 'PhotoAh'
    })
    if (result.length !== 1) {
      // TODO show user a message about creating album
      console.log("'Photo Frame' album not found")
      return
    }
    await self.getImages(result[0].id)
    self.initialized = true
    // self.slick = $('.carousel').slick(self.slickSettings)
    console.log(`Found ${self.images.length} images`)
  }
}
export default ViewModel
