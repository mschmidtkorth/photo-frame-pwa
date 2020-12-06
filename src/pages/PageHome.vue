<template>
  <q-page class="constrain q-pa-md">
    <div class="row justify-center q-mb-lg">
      <p v-if="!photoAlbumTitle" class="text-body1 text-weight-bold">
        TIP: First step is to add new album in your
        <a href="https://photos.google.com" target="_blank">Google Photos</a>
        named "PhotoAh". Share it with friends and family so they can add photos
        to your album.
      </p>
    </div>
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
      class="full-width constrain-fw"
      size="xl"
      padding="xl xl"
      color="primary"
      rounded
      icon="warning"
      label="Authorize PhotoAh"
      title="Authorize PhotoAh to view your google photos
"
    />
    <q-btn
      disable
      class="full-width constrain-fw"
      size="xl"
      padding="xl xl"
      color="primary"
      rounded
      icon="panorama"
      label="Create Album"
    />
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
import Vue from 'vue'

/* eslint no-unused-vars: 1 */
// eslint-disable-next-line
import { LocalStorage, SessionStorage } from 'quasar'

const apikeyKey = 'apikey'
export default Vue.extend({
  name: 'PageHome',
  data () {
    return {
      apikeyAlert: false,
      apikey: '',
      isSignedIn: false,
      photoAlbumTitle: ''
    }
  },
  methods: {
    initAuth () {
      // check for auth object
      // set button state accordingly
    }
  },
  watch: {
    apikey: function (val) {
      LocalStorage.set(apikeyKey, val)
    }
  },
  mounted () {
    // load API KEY from storage
    let lsApikey = LocalStorage.getItem(apikeyKey)
    if (lsApikey === 'null') lsApikey = null

    // console.log('apikey: ' + JSON.parse(this.apikey))
    if (lsApikey) {
      this.apikey = lsApikey

      this.authReady = true
    }
    // console.log('apikey: ' + this.apikey)
  }
})
</script>
<style></style>
