### New image flow

## UI

New photos indicator shows only when newImages exist and All is displayed
Slider wehre user can select only new
Check button that only shows when new exist, shows yes/no prompt
Refresh button that only shows when new don't exist, shows pup up flash message that 2 new images have been loaded

- App saves "read" imageIds in LocalStorage when user marks them as "read"

- If new images exist a push notification is displayed
- make buttons appear and fade away after 8 seconds
- only show new image icon when sreen activated (grey) or when new images (warning)
- clicking when no new will ask to check now
- clicking when warning will ask to show all or new and mark as read
- check album item count every 20 seconds
- verify pwa cache is working for images


-DONE: A background process runs every x minutes to refresh the baseurls of the images and add/update images to the image list using image id
- DONE: When an imageId is served from the api, the id is checked against the viewed imageIds and the newImage flag is set to true if not found

# Favorite, hidden image flow

User can favorite image and it's id is saved in the favoriteImages

# Filtering images

There will be a filter option to view "All (#), Favorited (#) or New (#)"