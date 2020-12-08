import { boot } from 'quasar/wrappers'
import { LocalStorage } from 'quasar'

const SCOPE = 'https://www.googleapis.com/auth/photoslibrary.readonly'

function installClient () {
  const apiUrl = 'https://apis.google.com/js/api.js'
  return new Promise(resolve => {
    var script = document.createElement('script')
    script.src = apiUrl
    script.onreadystatechange = script.onload = function () {
      if (!script.readyState || /loaded|complete/.test(script.readyState)) {
        setTimeout(function () {
          resolve()
        }, 500)
      }
    }
    document.getElementsByTagName('body')[0].appendChild(script)
  })
}
async function initClient (apiKey) {
  return new Promise((resolve, reject) => {
    window.gapi.load('client:auth2', () => {
      resolve(window.gapi)
    })
  })
}

function GAuth (gapi, store) {
  this.gapi = gapi
  this.store = store
  this.authInstance = null
  this.setSigninStatus = function () {
    const user = this.authInstance.currentUser.get()
    store.set('app/isSignedIn', user.hasGrantedScopes(SCOPE))
  }

  this.initClient = async function () {
    const apikey = store.get('app/apikey')
    if (apikey === '') return
    await gapi.client.init({
      apiKey: apikey,
      clientId:
        '773738037107-50714q5fdotjmh884clsghir2bljqj4t.apps.googleusercontent.com',
      discoveryDocs: [
        'https://photoslibrary.googleapis.com/$discovery/rest?version=v1'
      ],
      scope: SCOPE
    })
    this.authInstance = gapi.auth2.getAuthInstance()
    this.authInstance.isSignedIn.listen(this.setSigninStatus.bind(this))
    this.setSigninStatus()
  }

  this.signIn = async function () {
    if (this.authInstance == null) {
      await this.initClient()
    }
    if (!this.authInstance.isSignedIn.get()) {
      await this.authInstance.signIn()
    }
  }
  this.signOut = async function () {
    this.authInstance.signOut()
    store.set('app/isSignedIn', false)
  }
  this.initClient()
}
export default boot(async ({ app, router, store, Vue }) => {
  // something to do
  // await something()
  try {
    store.set('app/apikey', LocalStorage.getItem('apikey'))
    await installClient()
    const gapi = await initClient()
    Vue.prototype.$gAuth = new GAuth(gapi, store)
    store.set('app/authReady', true)
    console.log('client installed')
  } catch (e) {
    console.log('error loading gAuth: ' + e.message)
  }
})
