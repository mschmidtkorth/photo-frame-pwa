<template>
	<q-page class="constrain q-pa-md" id="pageSettings">
		<q-form class="q-gutter-md q-pa-lg">
			<q-input filled v-model="apikey" label="API KEY" hint="Please contact the developer for the API KEY" lazy-rules :rules="[val => (val && val.length == 39) || 'Invalid API KEY']" />

			<q-input filled type="number" v-model="slideSpeed" label="Slide duration in seconds" hint="default: 8 seconds" lazy-rules :rules="[
			          val =>
			            (val !== null && val !== '') ||
			            'Please enter a slide duration in seconds'
			        ]" />
			<div class="row">
				<div class="col-12 col-sm-8">
					<q-input filled for="albumTitle" v-model="albumTitle" label="Google Photos Album Title" hint="Use Google Photos to create the album" lazy-rules :rules="[
					              val =>
					                (val !== null && val !== '') ||
					                'Enter a photo album title from your Google Photos account'
					            ]" />
				</div>
				<div class="col-12 col-sm-4 q-pa-md">
					<q-checkbox left-label v-model="isSharedAlbum" label="Shared to you" />
				</div>
			</div>
			<div>
				<q-btn id="btnReload" label="Reload Album" color="primary" @click="reloadAlbum()" :loading="$store.imagesLoading" :disabled="!$store.isSignedIn || $store.imagesLoading"></q-btn>
			</div>
			<q-toggle :disable="false" :value="$store.isSignedIn" :label="
			          $store.isSignedIn
			            ? `Granted ${$store.appName} Access, toggle to revoke`
			            : `Authorize ${$store.appName} to access ${$store.albumTitle}`
			        " @input="setAuthStatus" :loading="$store.authInProgress" />
		</q-form>

		<div class="text-center">
			<q-banner v-show="
			          $store.albumLoaded &&
			            $store.images.length !== 0 &&
			            !$store.albumTitleChanged
			        " inline-actions class="text-white bg-positive" animated>
				"{{ $store.albumTitle }}" album has been loaded, click the "Slideshow"
				button to start it.<br />
				TIP: Share the "{{ $store.albumTitle }}" album with friends and family
				so they can add photos to your album.
			</q-banner>

			<q-banner v-show="
			          !$store.authInProgress &&
			            $store.authReady &&
			            $store.isSignedIn &&
			            !$store.imagesLoading &&
			            $store.images.length === 0 &&
			            !$store.albumTitleChanged
			        " inline-actions class="text-white bg-red" animated>
				"{{ $store.albumTitle }}" album not found or it is empty, please create
				an album titled "{{ $store.albumTitle }}" in your
				<a href="https://photos.google.com" target="_blank">Google Photos</a>
				and add at least 1 photo.
			</q-banner>
			<q-banner v-show="!$store.onLine" inline-actions class="text-white bg-warning" animated>
				You are currently offline, please check your internet connection.
			</q-banner>
		</div>
	</q-page>
</template>

<script>
import { store } from '../boot/store'
import { actions } from '../boot/actions'
export default {
	name: 'PageSettings',
	data() {
		return {
			apikey: store.apikey,
			albumTitle: store.albumTitle,
			slideSpeed: store.slideSpeed,
			isSharedAlbum: store.isSharedAlbum,
			$store: store,
			$actions: actions
		}
	},
	watch: {
		apikey: function (val) {
			actions.setLocalStorage('apikey', val)
		},
		albumTitle: function (val) {
			actions.setLocalStorage('albumTitle', val)
			store.albumLoaded = false
			store.albumTitleChanged = true
		},
		slideSpeed: function (val) {
			actions.setLocalStorage('slideSpeed', val)
		},
		isSharedAlbum: function (val) {
			actions.setLocalStorage('isSharedAlbum', val)
			store.albumLoaded = false
		}
	},
	methods: {
		reloadAlbum: async function () {
			store.albumTitleChanged = false
			this.$actions.loadImages()
		},
		setAuthStatus: async function () {
			if ($store.isSignedIn) {
				this.$gAuth.signOut()
			} else {
				try {
					await this.$gAuth.signIn()
					if ($store.isSignedIn) {
						await this.$actions.loadImages()
					}
				} catch (e) {
					console.log('error: ', e)
					// this.apikey = ''
					this.$q.dialog({
						class: 'warning',
						message: navigator.onLine
							? `Could not authorize ${$store.appName}, try checking the api key.`
							: 'You are currently offline'
					})
				}
			}
		}
	},
	mounted() {
		window.__vue_mounted = 'PageSettings'
	}
}
</script>
