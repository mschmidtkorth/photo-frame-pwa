import { boot } from 'quasar/wrappers'
import { loadImages } from './../services/imageService'
import { store, actions } from '../boot/store'

const SCOPE = 'https://www.googleapis.com/auth/photoslibrary.readonly'

function GAuth (store) {
  this.store = store
  this.gapi = null
  this.installClient = function installClient () {
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
  this.loadGapi = async function () {
    return new Promise((resolve, reject) => {
      window.gapi.load('client:auth2', () => {
        resolve(window.gapi)
      })
    })
  }
  this.setSigninStatus = async function () {
    if (this.authInstance == null) {
      store.isSignedIn = false
      return
    }
    const user = this.authInstance.currentUser.get()
    store.isSignedIn = user.hasGrantedScopes(SCOPE)
    if (store.isSignedIn) {
      await actions.loadImages(false)
    }
  }

  this.initClient = async function () {
    if (!store.authReady || !window.gapi) {
      await this.installClient()
      this.gapi = await this.loadGapi()
      store.authReady = true
    }
    const apikey = store.apikey
    if (!store.validApikey()) return
    try {
      await this.gapi.client.init({
        apiKey: apikey,
        clientId:
          '773738037107-50714q5fdotjmh884clsghir2bljqj4t.apps.googleusercontent.com',
        discoveryDocs: [
          'https://photoslibrary.googleapis.com/$discovery/rest?version=v1'
        ],
        scope: SCOPE
      })
    } catch (e) {
      console.log('authorization error: ', e)
      // actions.setApikey('')
      // throw new Error('Invalid apikey.')
    }

    this.authInstance = this.gapi.auth2.getAuthInstance()
    this.authInstance.isSignedIn.listen(this.setSigninStatus.bind(this))
    this.setSigninStatus()
  }

  this.signIn = async function () {
    try {
      store.authInProgress = true
      if (this.authInstance == null) {
        await this.initClient()
      }
      if (!this.authInstance.isSignedIn.get()) {
        await this.authInstance.signIn()
      }
    } finally {
      store.authInProgress = false
    }
  }
  this.signOut = async function () {
    this.authInstance.signOut()
    this.authInstance = null
    store.isSignedIn = false
    store.images = []
  }
}
export default boot(async ({ Vue }) => {
  Vue.prototype.$gAuth = new GAuth(store)
})
