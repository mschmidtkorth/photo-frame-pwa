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
          <b>Install {{ this.$store.appName }}?</b>
          <template v-slot:action>
            <q-btn dense flat label="Yes" class="q-px-sm" @click="installApp" />
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

<script>
import { store } from '../boot/store'
let deferredPrompt
let bannerHasBeenShown = false

export default {
  name: 'AppInstallBanner',
  data () {
    return {
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
    }
  },
  mounted () {
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

<style></style>
