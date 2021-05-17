<template>
  <div class="todo-flex image-egg">
    <img :class="shakingAnimation" :src="eggImage" alt="image when not completed" v-show="showingImage">
    <img class="y-axis-animation" src="/src/assets/animation/hatched-chick.svg" alt="image when completed" v-show="!showingImage">
  </div>
</template>

<script>
const imageSource = '/src/assets/animation'

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
        return `${imageSource}/white-egg.svg`;
      } else if( this.time >= 1) {
        return `${imageSource}/craked-egg.svg`;
      } else if( this.time == 0 ) {
        setTimeout(()=> this.showingImage = false, 1000)
        return `${imageSource}/born-egg.svg`
      } else {
        return `${imageSource}/broken-egg.svg`
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