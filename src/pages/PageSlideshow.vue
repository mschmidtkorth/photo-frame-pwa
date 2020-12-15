<template>
  <div class="">
    <q-carousel
      swipeable
      v-model="$store.currentSlideIndex"
      :autoplay="$store.autoplay"
      transition-next="slide-fade"
      transition-prev="slide-fade"
      :fullscreen.sync="fullscreen"
      animated
      infinite
      :height="windowHeight"
      @click="toggleControlClass"
    >
      <q-carousel-slide
        v-for="(img, index) in images"
        :key="index"
        :name="index"
        :img-src="img.baseUrl"
      />
      <template v-slot:control>
        <q-carousel-control
          position="bottom-right"
          :offset="[40, 40]"
          :class="controlClass"
        >
          <q-btn
            push
            square
            dense
            color="grey"
            size="xl"
            text-color="white"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click.stop="toggleFullScreen"
          />
        </q-carousel-control>
        <q-carousel-control
          position="top-right"
          :class="controlClass"
          :offset="[40, 40]"
        >
          <q-btn
            push
            square
            size="xl"
            dense
            color="grey"
            text-color="white"
            :icon="$store.autoplay === 0 ? 'play_arrow' : 'pause'"
            @click="$store.autoplay = $store.autoplay === 0 ? 8000 : 0"
          />
        </q-carousel-control>
        <q-carousel-control
          position="top-right"
          :class="controlClass"
          :offset="[40, 120]"
        >
          <q-btn
            push
            square
            size="xl"
            dense
            color="grey"
            text-color="white"
            icon="shuffle"
            @click="shuffleImages"
          />
        </q-carousel-control>
        <q-carousel-control position="bottom-left" :offset="[0, 40]">
          <q-btn
            push
            square
            size="xl"
            dense
            :text-color="newImageColor"
            icon="new_releases"
            @click.stop="newImagesOnly = !newImagesOnly"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
</template>

<script>
import { store, actions } from '../boot/store'

export default {
  data () {
    return {
      controlClass: '',
      windowHeight: 0,
      fullscreen: false,
      $store: store,
      interval: null,
      newImagesOnly: false
    }
  },
  computed: {
    images () {
      if (this.$store.images.length > 0) {
        this.$q.loading.hide()
      }
      return this.newImagesOnly
        ? this.$store.images.filter(i => i.new)
        : this.$store.images
    },
    newImageColor () {
      return this.$store.newImages ? 'warning' : ''
    }
  },
  methods: {
    toggleControlClass: function () {
      this.controlClass = this.controlClass === 'hidden' ? '' : 'hidden'
    },
    toggleFullScreen: function () {
      this.fullscreen = !this.fullscreen
      if (this.$q.fullscreen.isActive !== this.fullscreen) {
        this.$q.fullscreen.toggle()
      }
    },
    shuffleImages: function () {
      this.$actions.shuffleImages()
    }
  },
  created () {
    this.windowHeight = window.innerHeight - 124 + 'px'
    this.$q.loading.show()
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
