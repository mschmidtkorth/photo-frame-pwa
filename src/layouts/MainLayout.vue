<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="constrain">
        <q-toolbar-title class="text-bold text-fredoka-one">
          Photo<span style="font-style: italic;">Ahhhhh</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-footer class="bg-white" bordered>
      <q-tabs
        v-model="tab"
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab
          to="/slideshow"
          name="slideshow"
          icon="panorama"
          label="Slideshow"
          :disable="!authReady"
        />
        <q-route-tab to="/" name="settings" icon="settings" label="Settings" />
        <q-route-tab to="/help" name="help" icon="support" label="Help" />
      </q-tabs>
    </q-footer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Vue from 'vue'
import { get } from 'vuex-pathify'

export default Vue.extend({
  name: 'MainLayout',
  data () {
    return {
      tab: 'settings'
    }
  },
  computed: {
    authReady: get('app/authReady')
  }
})
</script>
<style lang="sass">
.q-toolbar__title
  text-align: center
  font-size: 30px
</style>
