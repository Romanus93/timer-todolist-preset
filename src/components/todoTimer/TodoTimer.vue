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
    <div class="container-b todo-button-wrapper todo-flex">
      <transition name="mode-fade" mode="out-in">
        <div v-if="on" key="on">
          <button style="width: 100px; height: 100px; background-color: green;" type="button" @click="pauseTimer()">STOP STOP STOP</button>
        </div>
        <div class="restart-exit-button todo-flex" v-else key="off">
          <button style="width: 100px; height: 100px; background-color: green;" type="button" @click="restartTimer()">Restart Restart Restart</button>
          <button style="width: 100px; height: 100px; background-color: red;" type="button" @click="offTimer(-999, 2000)">OFF OFF OFFF</button>
        </div>
      </transition>
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
        on: true
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
        console.log(time);
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

.todo-button-wrapper {
  justify-content: center;
}

.restart-exit-button {
  width: 100%;
  justify-content: space-evenly;
}

.mode-fade-enter-active, .mode-fade-leave-active {
  transition: opacity 0.4s ease;
}

.mode-fade-enter-from, .mode-fade-leave-to {
  opacity: 0;
}
</style>