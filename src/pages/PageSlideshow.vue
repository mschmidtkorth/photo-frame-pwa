<template>
  <div class="">
    <q-carousel
      swipeable
      v-model="slide"
      :autoplay="autoplay"
      transition-next="slide-fade"
      transition-prev="slide-fade"
      :fullscreen.sync="fullscreen"
      @mouseover="controlClass = ''"
      @mouseleave="controlClass = 'hidden'"
      @click="toggleControlClass"
      animated
      infinite
      :height="windowHeight"
    >
      <q-carousel-slide
        v-for="(img, index) in images"
        :key="index"
        :name="index"
        :img-src="img"
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
            @click="toggleFullScreen"
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
            :icon="autoplay === 0 ? 'play_arrow' : 'pause'"
            @click="autoplay = autoplay === 0 ? 8000 : 0"
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
      </template>
    </q-carousel>
  </div>
</template>

<script>
import { store } from '../boot/store'
import { shuffleImages } from '../services/imageService'

export default {
  data () {
    return {
      controlClass: 'hidden',
      windowHeight: 0
    }
  },
  computed: {
    images () {
      return this.$store.images
    },
    slide: {
      get () {
        return store.currentSlideIndex
      },
      set (val) {
        store.currentSlideIndex = val
      }
    },
    fullscreen: {
      get () {
        return store.fullscreen
      },
      set (val) {
        store.fullscreen = val
      }
    },
    autoplay: {
      get () {
        return store.autoplay
      },
      set (val) {
        store.autoplay = val
      }
    }
  },
  methods: {
    touchHover: function () {},
    toggleControlClass: function () {
      this.controlClass = this.controlClass === 'hidden' ? '' : 'hidden'
      console.log('touch')
      console.log('slide index: ' + this.slide)
    },
    toggleFullScreen: function () {
      this.fullscreen = !this.fullscreen
      if (this.$q.fullscreen.isActive !== this.fullscreen) {
        this.$q.fullscreen.toggle()
      }
    },
    shuffleImages: function () {
      shuffleImages()
      this.slide++
    }
  },
  created () {
    this.windowHeight = window.innerHeight - 124 + 'px'
  },
  mounted () {
    console.log('slide index: ' + this.slide)
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
