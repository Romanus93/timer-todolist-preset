<template>
  <div class="todo-flex todo-timer-component">
    <div class="todo-flex time">
      <span class="hour"> {{ hours }} </span>
      <span>:</span>
      <span class="minute">{{ minutes }}</span>
      <span>:</span>
      <span class="seconds">{{ seconds }}</span>
    </div>
    <div class="todo-timer-animation-wrapper">
        <timer-animation 
          :time="timeAnimation"
        />
    </div>
    <div class="todo-timer-buttons-wrapper">
      <div class="todo-flex todo-timer-buttons" v-show="buttons">
        <transition name="mode-fade" mode="out-in">
          <div v-if="on" key="on">
            <button class="button--timer pause-button" type="button" @click="pauseTimer()">일시정지</button>
          </div>
          <div class="restart-exit-button todo-flex" v-else key="off">
            <button class="button--timer restart-button" type="button" @click="restartTimer()">계속</button>
            <button class="button--timer off-button" type="button" @click="offTimer(-999, 2000)">종료</button>
          </div>
        </transition>
      </div>
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
        totalTime: this.todoTime,
        on: true,
        buttons: true
      }
    },
    created() {
      this.timeAnimation = this.totalTime;
    },
    mounted () {
      this.startTimer();
    },
    beforeUpdate() {
      this.timeAnimation = this.totalTime;
    },
    methods: {
      twoDigitTime: function(time){
        return (time < 10 ? '0' : '') + time;
      },
      startTimer: function() {
        this.timer = setInterval(() => this.totalTime--, 1000);
        console.log('startTimer', this.timer);
      },
      pauseTimer(param) {
        console.log('pauseTimer', this.totalTime);
        clearInterval(this.timer);
        this.on = false;
      },
      restartTimer() {
        this.timer = setInterval(() => this.totalTime--, 1000);
        this.on = true;
      },
      offTimer(totalTime, delayTime) {
        console.log('offTimer')
        this.buttons = false;
        clearInterval(this.timer);
        this.totalTime = totalTime;
        setTimeout(()=> this.$emit('deleteTodoItem'), delayTime);
      }
    },
    computed: {
      hours: function(){
        if(this.totalTime !== -999) {
          const hours = Math.floor(this.totalTime / (60*60));
          return this.twoDigitTime(hours);   
        } else {
          return this.twoDigitTime(0);
        }
      },
      minutes: function(){
        if(this.totalTime !== -999) {
          const minutes = Math.floor((this.totalTime - (this.hours * 60 * 60)) / 60);
          return this.twoDigitTime(minutes);
        } else {
          return this.twoDigitTime(0);
        }
      },
      seconds: function() {
        if(this.totalTime !== -999) {
          const seconds = this.totalTime - (this.hours * 60 *60) - (this.minutes * 60);
          return this.twoDigitTime(seconds);
        } else {
          return this.twoDigitTime(0);
        }
      }
    },
    watch: {
      totalTime(newValue, oldValue) {
        (newValue === 0)&&(console.log('watch',this.totalTime),this.offTimer(0, 3000));
      }
    }
  }
</script>

<style scoped>
@import "./todo-timer.css"
</style>