<template>
  <q-page class="constrain q-pa-md">
    <q-btn
      class="full-width constrain-fw"
      size="xl"
      padding="xl xl"
      color="primary"
      rounded
      :icon="$store.validApikey() ? 'check' : 'warning'"
      label="Set API Key"
      @click="apikeyDialog = true"
    />

    <q-btn
      :disable="apikey == ''"
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
      :loading="$store.authInProgress"
    />

    <div class="text-center">
      <q-banner
        v-show="$store.images.length > 0 && $store.isSignedIn"
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
        v-show="
          !$store.authInProgress &&
            $store.authReady &&
            $store.isSignedIn &&
            !$store.imagesLoading &&
            $store.images.length === 0
        "
        inline-actions
        class="text-white bg-red"
        animated
      >
        PhotoAh album not found or it is empty, please create an album titled
        "PhotoAh" in your
        <a href="https://photos.google.com" target="_blank">Google Photos</a>
        and add at least 1 photo.
      </q-banner>
    </div>

    <q-dialog v-model="apikeyDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">API Key</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            name="apikey_field"
            dense
            v-model="apikey"
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
import { store } from '../boot/store'
export default {
  name: 'PageHome',
  data () {
    return {
      apikeyDialog: false,
      apikey: store.apikey,
      $store: store
    }
  },
  methods: {
    updateApikey: function () {
      this.apikeyDialog = false
      this.$actions.setApikey(this.apikey)
    },
    setAuthStatus: async function () {
      if (this.$store.isSignedIn) {
        this.$gAuth.signOut()
      } else {
        try {
          await this.$gAuth.signIn()
        } catch (e) {
          this.apikey = ''
          this.$q.dialog({
            class: 'warning',
            message: 'Invalid Api Key, please set a valid Api Key'
          })
        }
      }
    }
  }
}
</script>
<style>
.q-transition--slide-fade-enter-active {
  transition: all 3s cubic-bezier(0.33, 1, 0.68, 1);
}
.q-transition--slide-fade-leave-active {
  transition: all 3s cubic-bezier(0.32, 0, 0.67, 0);
}
.q-transition--slide-fade-enter,
.q-transition--slide-fade-leave-to {
  opacity: 0;
  position: absolute;
}
</style>
