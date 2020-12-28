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
let updateTimeout = null

export default {
  name: 'MainLayout',
  data () {
    return {
      tab: 'settings',
      version: process.env.VERSION,
      $store: store
    }
  },
  components: {
    AppUpdateBanner,
    AppInstallBanner
  },

  methods: {
    // albumMissingCb () {
    //   if (this.$router.currentRoute.name !== 'Settings') {
    //     this.$router.push({ name: 'Settings' })
    //   }
    // },
    updateRegistration () {
      if (store.registration && !store.registration.waiting) {
        store.registration.update()
      }
    }
  },
  created () {
    // this.$actions.albumMissingCb = this.albumMissingCb
    // console.log('process.env: ', process.env.VERSION)
    updateTimeout = setInterval(
      function () {
        this.updateRegistration()
      }.bind(this),
      1000 * 60
    )
  },
  async mounted () {
    this.interval = setInterval(async () => {
      await this.$actions.loadImages(true)
    }, 1800000)
    this.updateRegistration()

    // if (!this.$store.authReady || this.$store.images.length === 0) {

    try {
      await this.$gAuth.initClient()
    } catch (e) {
      console.log('error: ' + e.message)
    }
    //   if (
    //     (!this.$store.authReady || !this.$store.isSignedIn) &&
    //     (navigator.onLine || this.$store.images.length === 0)
    //   ) {
    //     this.albumMissingCb()
    //   }
    // }
  },
  beforeDestroy () {
    if (updateTimeout) {
      clearInterval(updateTimeout)
    }
  }
}
</script>
<style lang="sass">
.q-toolbar__title
  text-align: center
  font-size: 30px
</style>
