<template>
  <div class="todo-flex image-egg">
    <img :class="shakingAnimation" :src="eggImage" alt="image when not completed" v-show="showingImage">
    <img class="y-axis-animation" src="../../assets/egg/hatched.svg" alt="image when completed" v-show="!showingImage">
  </div> 
</template>

<script>
import imageSource from './image-incoding.ts'

export default {
  name: 'TimerAnimation',
  props: {
    time: {
      type: Number,
      required: true
    },
  },
  data () {
    return {
      showingImage: true
    }
  },
  computed: {
    eggImage () {
      if(this.time > 20) {
        return imageSource.whiteEgg;
      } else if( this.time >= 1) {
        return imageSource.crakedEgg;
      } else if( this.time == 0 ) {
        setTimeout(()=> this.showingImage = false, 1000);
        return imageSource.bornEgg;
      } else {
        return imageSource.brokenEgg;
      }
    },
    shakingAnimation () {
      if(this.time > 19) {
        return {
          'slight-shaking': true 
        }
      } else if (this.time > 9) {
        return {
          'medium-shaking': true
        }
      } else if (this.time > 4) {
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