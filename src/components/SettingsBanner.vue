<template>
  <transition
    appear
    enter-active-class="animated bounceIn"
    leave-active-class="animated fadeOut"
  >
    <div
      v-if="!$store.albumLoaded && showBanner"
      class="banner-container bg-red"
    >
      <div class="constrain-banner">
        <q-banner dense inline-actions class="bg-red text-white">
          <template v-slot:avatar>
            <q-avatar
              name="error"
              color="error"
              icon="error"
              font-size="22px"
            />
          </template>
          <b
            >Album could not be loaded, would you like to check the settings?</b
          >
          <template v-slot:action>
            <q-btn
              dense
              flat
              label="Yes"
              class="q-px-sm"
              @click="goToSettings"
            />
            <q-btn
              dense
              flat
              @click="showBanner = false"
              label="No"
              class="q-px-sm"
            />
          </template>
        </q-banner>
      </div>
    </div>
  </transition>
</template>

<script>
import { store } from '../boot/store'
const bannerHasBeenShown = false

export default {
  name: 'SettingsBanner',
  data () {
    return {
      showBanner: false,
      $store: store
    }
  },
  methods: {
    goToSettings () {
      if (this.$router.currentRoute.name !== 'Settings') {
        this.$router.push({ name: 'Settings' })
      }
    }
  },
  mounted () {
    // Update UI notify the user they can install the PWA
    setTimeout(() => {
      this.showBanner = true
    }, 1000)
  }
}
</script>

<style></style>
