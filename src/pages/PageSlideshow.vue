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
      @click="showControls"
    >
      <!-- <img
        src="images/no-images.png"
        alt="no-images"
        class="fit"
        style="object-fit: cover;"
      /> -->
      <q-carousel-slide
        v-for="(img, index) in images"
        :key="index"
        :name="index"
        :img-src="img.baseUrl"
      />
      <template v-slot:control>
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
          :class="controlClass"
        >
          <q-btn
            push
            square
            dense
            color="grey"
            size="md"
            text-color="white"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="toggleFullScreen"
          />
        </q-carousel-control>
        <q-carousel-control
          position="top-right"
          :offset="[18, 18]"
          class="text-white rounded-borders"
          :class="controlClass"
          style="background: rgba(0, 0, 0, .3); padding: 4px 8px;"
        >
          <q-toggle
            dense
            dark
            color="orange"
            v-model="newImagesOnly"
            label="Only New"
          />
        </q-carousel-control>

        <q-carousel-control
          position="top-right"
          :class="controlClass"
          :offset="[18, 60]"
        >
          <q-btn
            push
            square
            size="md"
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
          :offset="[18, 100]"
        >
          <q-btn
            push
            square
            size="md"
            dense
            color="grey"
            text-color="white"
            :icon="$store.newImages ? 'check' : 'cached'"
            @click="
              $store.newImages
                ? $actions.markImagesRead()
                : $actions.loadImages(false)
            "
          />
        </q-carousel-control>
        <q-carousel-control
          position="top-right"
          :class="controlClass"
          :offset="[18, 140]"
        >
          <q-btn
            push
            square
            size="md"
            dense
            color="grey"
            text-color="white"
            icon="shuffle"
            @click="shuffleImages"
          />
        </q-carousel-control>
        <q-carousel-control position="bottom-left" :offset="[0, 18]">
          <q-btn
            square
            size="md"
            dense
            text-color="warning"
            icon="new_releases"
            :class="{ hidden: !$store.newImages }"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
</template>

<script>
import { store, actions } from '../boot/store'
let timeout = null
export default {
  data () {
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
    images () {
      if (this.$store.images.length > 0) {
        this.$q.loading.hide()
      }
      if (this.newImagesOnly) {
        const images = this.$store.images.filter(i => i.new)
        if (images.length === 0) {
          images.push({ id: 'no-images', baseUrl: 'images/no-images.png' })
        }
        return images
      }
      return this.$store.images
    },
    newImageColor () {
      return this.$store.newImages ? 'warning' : ''
    }
  },
  watch: {
    images: function (val) {
      if (this.$store.currentSlideIndex > val.length) {
        this.$store.currentSlideIndex = 0
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
        4000
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
