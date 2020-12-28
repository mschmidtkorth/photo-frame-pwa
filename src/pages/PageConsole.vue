<template>
  <main class="flex flex-start justify-center inset-shadow">
    <div
      class="q-pa-md col-12-sm col-8-md col-6-lg inset-shadow"
      style="width: 100%; height: 3px;"
    />
    <div
      class="q-pa-md col-12-sm col-8-md col-6-lg shadow-1"
      style="max-width: 800px; width: 100%;"
    >
      <li v-for="(log, index) in $store.logs" :key="index">{{ log }}</li>
    </div>
  </main>
</template>

<script>
import { store } from '../boot/store'

export default {
  data () {
    return {
      $store: store
    }
  }
}
</script>
