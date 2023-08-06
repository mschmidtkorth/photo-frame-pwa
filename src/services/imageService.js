const loadAlbums = function (shared) {
  // TODO if shared pull both personal and shared and filter out those that are in personal
  if (shared) {
    return window.gapi.client.photoslibrary.sharedAlbums
      .list({})
      .then(function (fullResponse) {
        const albums = fullResponse.result.sharedAlbums
        return albums
      })
  } else {
    return window.gapi.client.photoslibrary.albums
      .list({})
      .then(function (fullResponse) {
        const albums = fullResponse.result.albums
        return albums
      })
  }
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
            return {
              id: img.id,
              baseUrl: `${img.baseUrl}=w${w}-h${h}`,
              new: false,
              viewed: false
            }
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
const loadImages = async function (albumTitle, shared) {
  // TODO return null if can't load albums (no auth)
  const albums = await loadAlbums(shared)
  const result = albums.filter(a => {
    return a.title === albumTitle
  })
  if (result.length < 1) {
    // TODO show user a message about creating album
    console.log("'Photo Frame' album not found")
    return
  }
  return getImages(result[0].id)
}

export { loadImages }
