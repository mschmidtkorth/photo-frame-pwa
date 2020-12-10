<template>
  <q-page class="constrain q-pa-md">
    <q-btn
      class="full-width constrain-fw"
      size="xl"
      padding="xl xl"
      color="primary"
      rounded
      :icon="$store.apikey ? 'check' : 'warning'"
      label="Set API Key"
      @click="apikeyAlert = true"
    />

    <q-btn
      :disable="$store.apikey == ''"
      class="full-width constrain-fw"
      size="xl"
      padding="xl xl"
      color="primary"
      rounded
      :icon="$store.isSignedIn ? 'check' : 'warning'"
      :label="
        $store.isSignedIn ? 'Granted Photoah Access' : 'Authorize PhotoAh'
      "
      @click="setAuthStatus"
      :loading="authInProgress"
    />

    <div class="text-center">
      <q-banner
        v-show="$store.albumLoaded()"
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
        v-show="$store.isSignedIn && !$store.albumLoaded && !authInProgress"
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
            name="apikey_field"
            dense
            v-model="testInput"
            @keyup.enter="updateApikey()"
            autofocus
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="primary" v-close-popup />

          <q-btn
            flat
            label="Update API KEY"
            v-close-popup
            @click="updateApikey"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import ImageSerivceFactory from '../services/imageService'
import { store } from '../boot/store'
export default {
  name: 'PageHome',
  data () {
    return {
      apikeyAlert: false,
      // TODO move into gAuth/SignIn and have it update store
      authInProgress: false,
      testInput: 'AIzaSyD6ai2etV_mA2A-GLmYuM0IuDkpsTsaUXk',
      $store: store
    }
  },
  methods: {
    updateApikey: function () {
      this.apikeyAlert = false
      console.log('update api key: ' + this.testInput)
      // this.$q.dialog({ message: 'apikey updated' })
    },
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
      // TODO move into store, gauth
      const imageService = new ImageSerivceFactory()
      await imageService.init()
      this.$store.images = imageService.images
    }
  },
  // TODO make apikey computed so that it can call setApikey on store
  watch: {
    isSignedIn: function () {
      if (this.isSignedIn) {
        console.log('is signed in')
        this.loadImages()
      }
    }
  }
}
</script>
<style></style>
