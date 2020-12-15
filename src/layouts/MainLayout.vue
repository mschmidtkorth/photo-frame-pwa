<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary text-grey-10" bordered>
      <q-toolbar class="constrain">
        <q-toolbar-title class="text-bold text-fredoka-one text-white">
          Photo<span style="font-style: italic;">Ahhhhh</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-footer class="bg-white">
      <template>
        <transition
          appear
          enter-active-class="animated bounceIn"
          leave-active-class="animated fadeOut"
        >
          <div v-if="showAppInstallBanner" class="banner-container bg-primary">
            <div class="constrain-banner">
              <q-banner dense inline-actions class="bg-primary text-white">
                <template v-slot:avatar>
                  <q-avatar
                    name="signal_wifi_off"
                    color="primary"
                    icon="system_update"
                    font-size="22px"
                  />
                </template>
                <b>Install PhotoAh?</b>
                <template v-slot:action>
                  <q-btn
                    dense
                    flat
                    label="Yes"
                    class="q-px-sm"
                    @click="installApp"
                  />
                  <q-btn
                    dense
                    flat
                    @click="showAppInstallBanner = false"
                    label="Later"
                    class="q-px-sm"
                  />
                  <q-btn
                    dense
                    flat
                    label="Never"
                    class="q-px-sm"
                    @click="neverShowAppInstallBanner"
                  />
                </template>
              </q-banner>
            </div>
          </div>
        </transition>
      </template>

      <q-tabs
        v-model="tab"
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab
          to="/"
          name="slideshow"
          icon="panorama"
          label="Slideshow"
          :disable="$store.images.length === 0"
        />
        <q-route-tab
          to="/settings"
          name="settings"
          icon="settings"
          label="Settings"
        />
        <q-route-tab to="/help" name="help" icon="support" label="Help" />
      </q-tabs>
    </q-footer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { store } from '../boot/store'

let deferredPrompt
let bannerHasBeenShown = false
export default {
  name: 'MainLayout',
  data () {
    return {
      tab: 'settings',
      showAppInstallBanner: false,
      $store: store
    }
  },
  methods: {
    installApp () {
      this.showAppInstallBanner = false

      // Show the install prompt
      deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt')
          this.neverShowAppInstallBanner()
        } else {
          console.log('User dismissed the install prompt')
        }
      })
    },
    neverShowAppInstallBanner () {
      this.showAppInstallBanner = false
      this.$q.localStorage.set('neverShowInstall', true)
    },
    albumMissingCb () {
      if (this.$router.currentRoute.name !== 'Settings') {
        this.$router.push({ name: 'Settings' })
      }
      this.$q.loading.hide()
    }
  },
  created () {
    this.$actions.albumMissingCb = this.albumMissingCb
  },
  async mounted () {
    this.interval = setInterval(async () => {
      // call _loadimages every 30 minutes
      await this.$actions.loadImages(false)
    }, 1800000)
    if (!this.$store.authReady || this.$store.images.length === 0) {
      // check for valid api key, if not try to load from url
      if (!this.$store.validApikey()) {
        var urlParams = new URLSearchParams(window.location.search)
        if (urlParams.has('apikey')) {
          this.$actions.setApikey(urlParams.get('apikey'))
          window.location.replace(window.location.origin)
        }
      }
      try {
        await this.$gAuth.initClient()
      } catch (e) {
        console.log('error: ' + e.message)
      }
      if (!this.$store.authReady || !this.$store.isSignedIn) {
        this.albumMissingCb()
      }
    }
    const neverShowInstall = this.$q.localStorage.getItem('neverShowInstall')
    if (!neverShowInstall) {
      window.addEventListener('beforeinstallprompt', e => {
        if (bannerHasBeenShown === true) return
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault()
        // Stash the event so it can be triggered later.
        deferredPrompt = e
        bannerHasBeenShown = true

        // Update UI notify the user they can install the PWA
        setTimeout(() => {
          this.showAppInstallBanner = true
        }, 3000)
      })
    }
  }
}
</script>
<style lang="sass">
.q-toolbar__title
  text-align: center
  font-size: 30px
</style>
