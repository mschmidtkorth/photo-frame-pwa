## Dev Tips

### Things learned

- Windows has an animations setting that can be turned on and off and that stops browser animations. animate.style has more info
- Quasar is very much a wrapper around Vue, if info can't be found in quasar docs, go to the Vue docs
- Getting debugging working is hard, see the launch.json for config
- Don't add scripts to the dom in boot files, it causes problems with PWA detection
- Workbox is the new way to manage service workers
- To pick a "natural" color, copy a screen shot and paste into Paint.net and use the color picker
- show "Waiting for new images..." if new images is on and no images
- use FileReader to convert bytes to base 64 encodeed

### App Updated notification flow

- ```MainLayout.vue.created()``` sets up an interval which calls ```store.registration.update()``` every 60 seconds
- If an update is found the updated hook in ```register-service-worker.js``` is fired and the updated method sets ```store.showAppUpdatedBanner = true```
- If use clicks "Yes" the ```AppUpdateBanner.vue``` component posts a message to the service-worker to "SKIP_WAITING" and reloads the app bt calling ```window.location.reload()```
### Links

Danny's links:
http://dconnell.co.uk/#/resource/vscode

Dynamic themes:
https://michaelnthiessen.com/dynamically-add-class-name/

Redirecting from vue:
https://forum.quasar-framework.org/topic/3073/redirect-to-page-after-action

Access query string:
https://davidwalsh.name/query-string-javascript

Promises:
https://medium.com/javascript-in-plain-english/converting-javascript-callbacks-to-promise-and-async-await-replacing-async-waterfall-method-with-3c8b7487e0b9

Vue Google OAuth2 example:
https://github.com/marknguyen85/vue-google-oauth2-ext/blob/master/index.js

Quasar Auth Starter Kit (login,logout, etc)
https://github.com/stefanvanherwijnen/quasar-auth-starter/tree/master/frontend

Web.dev PWA tutorial
https://web.dev/customize-install/

Storybook:
https://storybook.js.org/

Dynamic Forms:
https://levelup.gitconnected.com/add-dynamic-forms-to-your-vue-app-609de4005a2b

Example repos including some dynamic form examples:
https://github.com/34fame?tab=repositories

History mode on github.io:
https://dev.to/quasar/publish-your-quasar-spa-on-github-io-with-history-mode-20h2

Workbox recipes (hard to find by googling):
https://developers.google.com/web/tools/workbox/modules/workbox-recipes