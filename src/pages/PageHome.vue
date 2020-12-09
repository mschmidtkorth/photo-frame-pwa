<template>
  <q-page class="constrain q-pa-md">
    <q-btn
      class="full-width constrain-fw"
      size="xl"
      padding="xl xl"
      color="primary"
      rounded
      :icon="apikey ? 'check' : 'warning'"
      label="Set API Key"
      @click="apikeyAlert = true"
    />

    <q-btn
      :disable="apikey == ''"
      class="full-width constrain-fw"
      size="xl"
      padding="xl xl"
      color="primary"
      rounded
      :icon="isSignedIn ? 'check' : 'warning'"
      :label="isSignedIn ? 'Granted Photoah Access' : 'Authorize PhotoAh'"
      @click="setAuthStatus"
      :loading="authInProgress"
    />

    <div class="text-center">
      <q-banner
        v-show="albumLoaded"
        inline-actions
        class="text-white bg-positive"
        animated
      >
        PhotoAh album has been loaded, click the "Slideshow" button to start
        it.<br />
        TIP: Share the PhotoAh album with friends and family so they can add
        photos to your album.
      </q-banner>

      <q-banner
        v-show="apikey !== '' && isSignedIn && !albumLoaded"
        inline-actions
        class="text-white bg-red"
        animated
      >
        PhotoAh album not found, please create an album titled "PhotoAh" in your
        <a href="https://photos.google.com" target="_blank">Google Photos</a>.
      </q-banner>
    </div>

    <q-dialog v-model="apikeyAlert">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">API Key</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="apikey"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="primary" v-close-popup />

          <q-btn flat label="Update API KEY" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- <div class="q-pa-md">
      <q-btn
        color="secondary"
        @click="$q.fullscreen.toggle()"
        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        :label="$q.fullscreen.isActive ? 'Exit Fullscreen' : 'Go Fullscreen'"
      />
    </div> -->
  </q-page>
</template>

<script>
// import Vue from 'vue'

import { get } from 'vuex-pathify'
import ImageSerivceFactory from '../services/imageService'

// export default Vue.extend({
export default {
  name: 'PageHome',
  data () {
    // debugger
    return {
      apikeyAlert: false,
      authInProgress: false
    }
  },
  methods: {
    setAuthStatus: async function () {
      if (this.isSignedIn) {
        this.$gAuth.signOut()
      } else {
        this.authInProgress = true
        await this.$gAuth.signIn()
        await this.loadImages()
        this.authInProgress = false
      }
    },
    loadImages: async function () {
      const imageService = new ImageSerivceFactory()
      await imageService.init()
      this.$store.set('app/images', imageService.images)
    }
  },
  computed: {
    apikey: {
      get: get('app/apikey'),
      set (val) {
        this.$store.dispatch('app/setApikey', val)
      }
    },
    isSignedIn: get('app/isSignedIn'),
    albumLoaded: get('app/images@length')
  },
  watch: {
    isSignedIn: function () {
      if (this.isSignedIn) {
        this.loadImages()
      }
    }
  }
}
</script>
<style></style>
