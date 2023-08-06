<template>
	<div class="">
		<q-carousel swipeable :class="{ hidden: !$store.albumLoaded && !$store.imagesLoading }" v-model="$store.currentSlideIndex" :autoplay="$store.autoplay ? parseInt($store.slideSpeed) * 1000 : 0" transition-next="slide-fade" transition-prev="slide-fade" :fullscreen.sync="fullscreen" animated infinite :height="windowHeight" @click="showControls">
			<!-- <img
        src="images/no-images.png"
        alt="no-images"
        class="fit"
        style="object-fit: cover;"
      /> -->
			<q-carousel-slide v-for="(img, index) in images" :key="index" :name="index" :img-src="img.baseUrl" />
			<template v-slot:control>
				<q-carousel-control position="top-right" :offset="[60, 300]" :class="controlClass">
					<q-btn push square dense color="grey" size="xl" text-color="white" :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="toggleFullScreen" />
				</q-carousel-control>
				<q-carousel-control position="top-right" :offset="[160, 60]" class="text-white rounded-borders" :class="controlClass" style="background: rgba(0, 0, 0, .3); padding: 4px 8px; font-size: 24px">
					<q-toggle dense dark color="orange" v-model="newImagesOnly" :label="'Only New (' + newImageCt + ')'" />
				</q-carousel-control>

				<q-carousel-control position="top-right" :class="controlClass" :offset="[60, 60]">
					<q-btn push square size="xl" dense color="grey" text-color="white" :icon="$store.autoplay ? 'pause' : 'play_arrow'" @click="$store.autoplay = !$store.autoplay" />
				</q-carousel-control>
				<q-carousel-control position="top-right" :class="controlClass" :offset="[60, 140]">
					<q-btn push square size="xl" dense color="grey" text-color="white" :icon="$store.newImages ? 'check' : 'cached'" @click="
					              $store.newImages
					                ? $actions.markImagesRead()
					                : $actions.loadImages(false)
					            " />
				</q-carousel-control>
				<q-carousel-control position="top-right" :class="controlClass" :offset="[60, 220]">
					<q-btn push square size="xl" dense color="grey" text-color="white" icon="shuffle" @click="shuffleImages" />
				</q-carousel-control>
				<q-carousel-control position="bottom-left" :offset="[0, 18]">
					<q-btn square size="md" dense text-color="warning" icon="new_releases" :class="{ hidden: !$store.newImages }" />
				</q-carousel-control>
			</template>
		</q-carousel>
		<settings-banner></settings-banner>
	</div>
</template>

<script>
import { store } from '../boot/store'
import { actions } from '../boot/actions'
import axios from 'axios'
import SettingsBanner from 'src/components/SettingsBanner.vue'

let timeout = null
let wakeLock = null
let wakeLockAutoPlayState = null

const requestWakeLock = async () => {
	try {
		wakeLock = await navigator.wakeLock.request('screen')
		wakeLock.addEventListener('release', () => {
			console.log('Screen Wake Lock released')
			wakeLockAutoPlayState = store.autoplay
			store.autoplay = false
		})
		console.log('Screen Wake Lock acquired')
	} catch (err) {
		console.error(`${err.name}, ${err.message}`)
	}
}
const handleVisibilityChange = async () => {
	if (wakeLock !== null && document.visibilityState === 'visible') {
		if (wakeLockAutoPlayState) {
			store.autoplay = true
		}
		await requestWakeLock()
		if (store.registration && !store.registration.waiting) {
			store.registration.update()
		}
	}
}
document.addEventListener('visibilitychange', handleVisibilityChange)
export default {
	components: { SettingsBanner },
	data() {
		return {
			controlClass: 'hidden',
			windowHeight: 0,
			fullscreen: false,
			$store: store,
			$actions: actions,
			interval: null,
			newImagesOnly: false
		}
	},
	computed: {
		imagesLoading() {
			return store.imagesLoading
		},
		images() {
			console.log('aaaaa',store)
			if (store.images.length > 0) {
				this.$q.loading.hide()
			}
			if (this.newImagesOnly) {
				const images = store.images.filter(i => i.new)
				if (images.length === 0) {
					images.push({ id: 'no-images', baseUrl: 'images/no-images.png' })
				}
				return images
			}
			return store.images
		},
		allowFullScreen() {
			return this.fullscreen && !store.showAppUpdatedBanner
		},
		newImageColor() {
			return store.newImages ? 'warning' : ''
		},
		newImageCt() {
			const images = store.images.filter(i => {
				return i.new && i.id !== 'no-images'
			})
			return images.length
		}
	},
	watch: {
		images: function (val) {
			if (store.currentSlideIndex > val.length) {
				store.currentSlideIndex = 0
			}
		},
		allowFullScreen: function (val) {
			if (!val && this.fullscreen) {
				this.toggleFullScreen()
			}
		},
		imagesLoading: function (val) {
			if (!val) {
				this.$q.loading.hide()
			}
		}
	},

	methods: {
		showControls: function () {
			this.controlClass = ''
			if (timeout) {
				clearTimeout(timeout) // cancel the previous timer.
				timeout = null
			}
			timeout = setTimeout(
				function () {
					this.controlClass = 'hidden'
					clearTimeout((this.timeout = null))
				}.bind(this),
				5000
			)
		},
		toggleFullScreen: function () {
			this.fullscreen = !this.fullscreen
			if (this.$q.fullscreen.isActive !== this.fullscreen) {
				this.$q.fullscreen.toggle()
			}
		},
		shuffleImages: function () {
			this.$actions.shuffleImages()
		},
		onlyNew: function () {
			this.newImagesOnly = !this.newImagesOnly
			store.currentSlideIndex = 0
		}
	},
	async created() {
		this.windowHeight = window.innerHeight - 124 + 'px'
		this.$q.loading.show()
		if ('wakeLock' in navigator) {
			await requestWakeLock()
		} else {
			// alert('Wake lock not supported')
			console.log('wakelock:', 'wakeLock' in navigator)
		}
		// await this.$actions.loadImages(false)
	},
	async beforeDestroy() {
		if ('wakeLock' in navigator) {
			wakeLock.release()
			// wakeLock = null
		}
	}
}
</script>
<style>
.q-carousel__slide {
	min-height: 100%;
	background-size: contain;
	background-position: 50%;
	background-repeat: no-repeat;
}

.q-carousel__slides-container {
	height: 100%;
	background-color: black;
}

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
