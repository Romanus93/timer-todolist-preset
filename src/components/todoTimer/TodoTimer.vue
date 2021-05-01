<template>
  <div class="container">
    <div class="app-timer">
      <div class="timer">
        <span class="hour"> {{ hours }} </span>
        <span>:</span>
        <span class="minute">{{ minutes }}</span>
        <span>:</span>
        <span class="seconds">{{ seconds }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TodoTimer",
    props: {
      todoTime: {
        type: Number,
        required: true 
      }
    },
    data() {
      return {
        timer: null,
        totalTime: this.todoTime
      }
    },
    created() {
      console.log('created', this.totalTime);
    },
    mounted () {
      this.startTimer();
      console.log('mounted', this.totalTime);
    },
    beforeUpdate() {
      console.log('beforeUpdate', this.totalTime);
      this.$emit('checkTime',this.totalTime);
    },
    methods: {
      startTimer: function() {
        this.timer = setInterval(() => this.totalTime--, 1000);
        this.resetButton = true;
      },
      twoDigitTime: function(time){
        console.log(time);
        return (time < 10 ? '0' : '') + time;
      }
    },
    computed: {
      hours: function(){
        if(this.totalTime !== undefined) {
          const hours = Math.floor(this.totalTime / (60*60));
          return this.twoDigitTime(hours);   
        } else {
          return this.twoDigitTime(0);
        }
      },
      minutes: function(){
        if(this.totalTime !== undefined) {
          const minutes = Math.floor((this.totalTime - (this.hours * 60 * 60)) / 60);
          return this.twoDigitTime(minutes);
        } else {
          return this.twoDigitTime(0);
        }
      },
      seconds: function() {
        if(this.totalTime !== undefined) {
          const seconds = this.totalTime - (this.hours * 60 *60) - (this.minutes * 60);
          return this.twoDigitTime(seconds);
        } else {
          console.log('undefinde follow');
          return this.twoDigitTime(0);
        }
      },
    },
    watch: {
      totalTime(newValue, oldValue) {
        (newValue === 0)&&(console.log('watch',this.totalTime),clearInterval(this.timer));
        (newValue === undefined)&&(console.log('watch',this.totalTime),clearInterval(this.timer));
      },
    }
  }
</script>

<style scoped>
.container {
  height: 50vh;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  background-color: #222831;
}

.timer {
  font-size: 5rem;
  color: #EEEEEE;
}
</style>