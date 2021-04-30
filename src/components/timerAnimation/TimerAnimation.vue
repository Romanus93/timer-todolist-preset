<template>
  <div class="image-egg todo-flex image-background" :class="{ 'sad-background-image': failure }">
    <img :class="shakingAnimation" :src="eggImage" v-show="success">
    <img class="translate-y" src="../../assets/animation/hatched-chick.svg" alt="" v-show="success">
  </div>
</template>

<script>
  export default {
    props: {
      time: {
        type: Number
      },
    },
    data() {
      return {
        success: true,
        failure: false
      }
    },
    computed: {
      eggImage() {
        if(this.time > 20 || this.time === null) {
          return '/src/assets/animation/white-egg.svg';
        } else if( this.time >= 1) {
          return '/src/assets/animation/craked-egg.svg';
        } else if( this.time == 0 ) {
          setTimeout(()=> this.happy= false, 1000)
          return '/src/assets/animation/born-egg.svg'
        } else {
          this.sad = true;
          return '/src/assets/animation/broken-egg.svg'
        }
      },
      shakingAnimation() {
        if(this.time > 20 || this.time === null) {
          return {
            'slight-shaking': true 
          }
        } else if (this.time > 10) {
          return {
            'medium-shaking': true
          }
        } else if (this.time > 6) {
          return {
            'strong-shaking': true
          }
        } else if (this.time >= 1) {
          return {
            'stronger-shaking': true
          }
        } else if (this.time === 0) {
          return undefined;
        } else {
          return {
            'strong-shaking': true
          }
        }
      }
    }
  }
</script>

<style scoped>
@import "./timer-animation.css";
</style>