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
      label="Sign In With Google"
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
      <q-card>
        <q-card-section>
          <div class="text-h6">Retrieve API Key</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          In order to save the API Key to the app, you must click on an
          appropiate url containing the API Key as part of the query string.
          E.g. https://photoah.com?apiKey=XXXX-XXXXXXXX
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
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
  mounted () {}
})
</script>
<style></style>
