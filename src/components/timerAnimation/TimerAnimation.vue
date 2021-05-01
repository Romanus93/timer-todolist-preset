<template>
  <div class="image-egg todo-flex image-background" :class="{ 'sad-background-image': failure }">
    <img :class="shakingAnimation" :src="eggImage" v-show="success">
    <img class="translate-y" src="/src/assets/animation/hatched-chick.svg" alt="" v-show="!success">
  </div>
</template>

<script>
  export default {
    props: {
      time: {
        type: Number,
        required: true
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
        if(this.time > 20) {
          return '/src/assets/animation/white-egg.svg';
        } else if( this.time >= 1) {
          return '/src/assets/animation/craked-egg.svg';
        } else if( this.time == 0 ) {
          setTimeout(()=> this.success= false, 1000)
          return '/src/assets/animation/born-egg.svg'
        } else {
          this.failure = true;
          return '/src/assets/animation/broken-egg.svg'
        }
      },
      shakingAnimation() {
        if(this.time > 20) {
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
    },
    created () {
      console.log('Created-TimerAnimation');
      console.log(this.time);
    },
    beforeMount () {
      console.log('BeforeMount-TimerAnimation');
      console.log(this.time);
    },
    beforeUpdate () {
      console.log('BeforeUpdate-TimerAnimation');
      console.log(this.time);
    }
  }
</script>

<style scoped>
@import "./timer-animation.css";
</style>