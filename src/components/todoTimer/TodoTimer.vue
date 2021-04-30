<template>
  <div class="container">
    <div class="app-timer">
      <div class="timer" v-if="isVisible">
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
        totalTime: this.todoTime,
        title: "Countdown to rest time!",
        isVisible: true
      }
    },
    methods: {
      startTimer: function() {
        this.timer = setInterval(() => this.totalTime--, 1000); //1000ms = 1 second
        this.resetButton = true;
      },
      twoDigitTime: function(time){
        console.log(time);
        return (time < 10 ? '0' : '') + time;
      }
    },
    computed: {
      hours: function(){
        console.log(this.totalTime);
        const hours = Math.floor(this.totalTime / (60*60));
        console.log(hours);
        return this.twoDigitTime(hours);
      },
      minutes: function(){
        const minutes = Math.floor((this.totalTime - (this.hours * 60 * 60)) / 60);
        return this.twoDigitTime(minutes);
      },
      seconds: function() {
        const seconds = this.totalTime - (this.hours * 60 *60) - (this.minutes * 60);
        return this.twoDigitTime(seconds);
      }
    },
    mounted () {
      this.startTimer();
    },
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