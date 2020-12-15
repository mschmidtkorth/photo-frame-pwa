### New image flow

- App saves "read" imageIds in LocalStorage when user marks them as "read"
- DONE: When an imageId is served from the api, the id is checked against the viewed imageIds and the newImage flag is set to true if not found
- If new images exist a push notification is displayed
- After new image is displayed, it's "viewed" flag is set to true
-After all new images are viewed a message is displayed asking user if they should mark all new images as "read"
-A background process runs every x minutes to refresh the baseurls of the images and add/update images to the image list using image id

# Favorite image flow

User can favorite image and it's id is saved in the favoriteImages

# Filtering images

There will be a filter option to view "All (#), Favorited (#) or New (#)"