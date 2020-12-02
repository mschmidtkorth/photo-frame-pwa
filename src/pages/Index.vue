<template>
    <div class="">

      <q-carousel
        animated
        v-model="slide"
        infinite
        swipeable
        :autoplay="10000"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
        transition-next="slide-fade"

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
      autoplay: true
    }
  }
}
</script>
<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.custom-enter-active {
  transition: all 3s ease;
}
.custom-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.custom-enter, .custom-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.custom-right .custom-left {
  transition: all 3s ease;
}
.q-transition-custom {
  transition: all 3s ease;
}
.slide-fade-enter-active {
  transition: all 2s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(30px);
  opacity: 0;
}
q-transition--slide-fade {
  transition: all 2s ease;
}
</style>
