<template>
  <div>
    <h1>About Copnents</h1>
    <swiper
    :slides-per-view="1"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    >
      <swiper-slide><img src="../assets/choco1.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="../assets/choco2.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="../assets/choco3.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="../assets/choco4.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="../assets/choco5.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="../assets/choco6.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="../assets/choco7.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="../assets/choco8.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="../assets/choco9.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="../assets/choco10.jpg" alt=""></swiper-slide>
    </swiper>
  </div>
</template>

<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/swiper.scss';

  export default {
    name: 'About',
    components: {
      Swiper,
      SwiperSlide,
    },
    methods: {
      onSwiper(swiper) {
        console.log(swiper);
      },
      onSlideChange() {
        console.log('slide change');
      },
    },
  };
</script>

<style scoped>
  img {
    width: 70%;
    height: 70%;
  } 
</style>