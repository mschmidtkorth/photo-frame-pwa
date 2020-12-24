<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary">
      <q-toolbar class="constrain text-white">
        <q-toolbar-title class="text-bold text-fredoka-one">
          {{ this.$store.appName }}
        </q-toolbar-title>
        <div>v{{ version }}</div>
      </q-toolbar>
    </q-header>
    <q-footer class="bg-white">
      <app-install-banner></app-install-banner>
      <app-update-banner></app-update-banner>
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
        <q-route-tab to="/help" name="help" icon="help" label="Help" />
      </q-tabs>
    </q-footer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { store } from '../boot/store'
import AppUpdateBanner from 'src/components/AppUpdateBanner.vue'
import AppInstallBanner from 'src/components/AppInstallBanner.vue'

export default {
  name: 'MainLayout',
  data () {
    return {
      tab: 'settings',
      showAppInstallBanner: false,
      version: process.env.VERSION,
      $store: store
    }
  },
  components: {
    AppUpdateBanner,
    AppInstallBanner
  },
  methods: {
    albumMissingCb () {
      if (this.$router.currentRoute.name !== 'Settings') {
        this.$router.push({ name: 'Settings' })
      }
      this.$q.loading.hide()
    }
  },
  created () {
    this.$actions.albumMissingCb = this.albumMissingCb
    // console.log('process.env: ', process.env.VERSION)
  },
  async mounted () {
    this.interval = setInterval(async () => {
      await this.$actions.loadImages(false)
    }, 1800000)
    if (!this.$store.authReady || this.$store.images.length === 0) {
      // check for valid api key, if not try to load from url

      var urlParams = new URLSearchParams(window.location.search)
      if (urlParams.has('apikey')) {
        this.$actions.setLocalStorage('apikey', urlParams.get('apikey'))
        window.location.replace(window.location.origin)
      }

      try {
        await this.$gAuth.initClient()
      } catch (e) {
        console.log('error: ' + e.message)
      }
      if (
        !this.$store.authReady ||
        (!this.$store.isSignedIn && navigator.onLine)
      ) {
        this.albumMissingCb()
      }
    }
  }
}
</script>
<style lang="sass">
.q-toolbar__title
  text-align: center
  font-size: 30px
</style>
