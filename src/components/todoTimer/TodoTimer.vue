<template>
  <div>
    <div class="container">
      <div class="timer">
        <span class="hour"> {{ hours }} </span>
        <span>:</span>
        <span class="minute">{{ minutes }}</span>
        <span>:</span>
        <span class="seconds">{{ seconds }}</span>
      </div>
    </div>
    <div class="container-a todo-timer-animation-wrapper">
        <timer-animation 
          :time="timeAnimation"
        />
    </div>
    <div class="container-b todo-button-wrapper">
      <button style="width: 100px; height: 100px;" type="button" @click="pauseTimer()">STOP Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, exercitationem!</button>
      <button style="width: 100px; height: 100px;" type="button" @click="restartTimer()">Restart Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, exercitationem!</button>
    </div>
  </div>
</template>

<script>
import TimerAnimation from "../timerAnimation/TimerAnimation.vue"

  export default {
    name: "TodoTimer",
    components: {
      TimerAnimation
    },
    props: {
      todoTime: {
        type: Number,
        required: true 
      }
    },
    data() {
      return {
        timeAnimation: null,
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
      console.log('beforeUpdate');
      console.log('beforeUpdate', this.totalTime);
      console.log('beforeUpdate', this.timeAnimation);
      this.timeAnimation = this.totalTime;
    },
    methods: {
      startTimer: function() {
        this.timer = setInterval(() => this.totalTime--, 1000);
        console.log('startTimer', this.timer);
      },
      twoDigitTime: function(time){
        console.log(time);
        return (time < 10 ? '0' : '') + time;
      },
      pauseTimer(param) {
        console.log('pauseTimer', this.totalTime);
        clearInterval(this.timer);
      },
      restartTimer() {
        this.timer = setInterval(() => this.totalTime--, 1000);
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
      }
    },
    watch: {
      totalTime(newValue, oldValue) {
        console.log('watch', this.totalTime);
        (newValue === 0)&&(console.log('watch',this.totalTime),clearInterval(this.timer));
      },
    }
  }
</script>

<style scoped>
.container {
  height: 50%;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  background-color: #222831;
}

.container-A {
  width: 90%;
  height: 50%;
}

.timer {
  font-size: 5rem;
  color: #EEEEEE;
}
</style>