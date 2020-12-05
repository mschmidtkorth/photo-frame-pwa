<template>
  <div class="">
    <q-carousel
      v-model="slide"
      :autoplay="autoplay"
      @mouseenter="autoplay = 0"
      @mouseleave="autoplay = 8000"
      transition-next="slide-fade"
      transition-prev="slide-fade"
      animated
      infinite
    >
      <q-carousel-slide
        v-for="(img, index) in images"
        :key="index"
        :name="index"
        :img-src="img"
      />
    </q-carousel>
    <div class="q-pa-md row justify-center">
      <q-btn
        rounded
        size="xl"
        color="primary"
        @click="$q.fullscreen.toggle()"
        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        :label="$q.fullscreen.isActive ? 'Exit Fullscreen' : 'Go Fullscreen'"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 1,
      autoplay: 8000,
      images: [
        'https://cdn.quasar.dev/img/quasar.jpg',
        'https://cdn.quasar.dev/img/parallax2.jpg',
        'https://cdn.quasar.dev/img/parallax1.jpg',
        'https://cdn.quasar.dev/img/mountains.jpg'
      ]
    }
  },
  methods: {}
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
