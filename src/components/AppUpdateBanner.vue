<template>
	<transition appear enter-active-class="animated bounceIn" leave-active-class="animated fadeOut">
		<div v-if="$store.showAppUpdatedBanner" class="banner-container bg-primary">
			<div class="constrain-banner">
				<q-banner name="update-banner" dense inline-actions class="bg-primary text-white">
					<template v-slot:avatar>
						<q-avatar name="signal_wifi_off" color="primary" icon="system_update" font-size="22px" />
					</template>
					<b>{{ $store.appName }} has an update pending, update now?</b>
					<template v-slot:action>
						<q-btn dense flat label="Yes" class="q-px-sm" @click="updateApp(true)" />
						<q-btn dense flat label="No" class="q-px-sm" @click="updateApp(false)" />
					</template>
				</q-banner>
			</div>
		</div>
	</transition>
</template>

<script>
import { store } from '../boot/store'
let refreshing = false
export default {
  name: 'AppUpdateBanner',
  data () {
    return {
      $store: store
    }
  },
  methods: {
    updateApp (yes) {
      $store.showAppUpdatedBanner = false
      if (!yes || refreshing) {
        return
      }
      refreshing = true
      if (store.registration && store.registration.waiting) {
        store.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      }
      window.location.reload(true)
    }
  }
}
</script>

<style></style>
