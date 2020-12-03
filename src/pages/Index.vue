<template>
    <div class="">
            <q-carousel
        animated
        v-model="slide"
        infinite
        :autoplay="autoplay"
        transition-next="slide-fade"
        transition-prev="slide-fade"
        @mouseenter="autoplay = 0"
        @mouseleave="autoplay = 8000"
      >
        <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
        <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
        <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
        <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
      </q-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 1,
      autoplay: 8000
    }
  }
}
</script>
<style>

.q-transition--slide-fade-enter-active {
  transition: all 3s cubic-bezier(0.33, 1, 0.68, 1);;
}
.q-transition--slide-fade-leave-active {
  transition: all 3s cubic-bezier(0.32, 0, 0.67, 0);
}
.q-transition--slide-fade-enter, .q-transition--slide-fade-leave-to
 {
  opacity: 0;
  position: absolute;
}
</style>
