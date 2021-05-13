<template>
  <div class="todo-flex image-egg">
    <img :class="shakingAnimation" :src="eggImage" v-show="completion">
    <img class="y-axis-animation" src="/src/assets/animation/hatched-chick.svg" alt="image when completed" v-show="!completion">
  </div>
</template>

<script>
  export default {
    name: 'TimerAnimation',
    props: {
      time: {
        type: Number,
        required: true
      },
    },
    data() {
      return {
        completion: true
      }
    },
    beforeCreate () {
    console.log('beforecreated-TimerAnimation');
    },
    created() {
      console.log('created-TimerAnimation');
    },
    beforeMount () {
      console.log('beforeMount-TimerAnimation');
    },
    mounted () {
      console.log('mounted-TimerAnimation');
    },
    computed: {
      eggImage() {
        if(this.time > 20) {
          return '/src/assets/animation/white-egg.svg';
        } else if( this.time >= 1) {
          return '/src/assets/animation/craked-egg.svg';
        } else if( this.time == 0 ) {
          setTimeout(()=> this.completion= false, 1000)
          return '/src/assets/animation/born-egg.svg'
        } else {
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
    }
  }
</script>

<style scoped>
@import "./timer-animation.css";
</style>