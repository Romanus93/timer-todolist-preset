<template>
  <div class="todo-flex todo-timer-component">
    <div class="todo-flex time">
      <span class="hour"> {{ hours }} </span>
      <span>:</span>
      <span class="minute">{{ minutes }}</span>
      <span>:</span>
      <span class="seconds">{{ seconds }}</span>
    </div>
    <div class="todo-timer-animation-component">
        <timer-animation 
          :time="timeAnimation"
        />
    </div>
    <div class="todo-flex todo-timer-buttons" v-show="buttons">
      <transition name="mode-fade" mode="out-in">
        <div v-if="on" key="on">
          <button class=" pause-button button--timer" type="button" @click="pauseTimer()">일시정지</button>
        </div>
        <div class="todo-flex restart-off-buttons" v-else key="off">
          <button class=" restart-button button--timer" type="button" @click="restartTimer()">계속</button>
          <button class=" off-button button--timer" type="button" @click="offTimer(-999, 2000)">종료</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import TimerAnimation from "/src/components/timer-animation/TimerAnimation.vue"

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
      buttons: true,
      timerStatus: null
    }
  },
  // beforeCreate () {
  //   console.log('beforecreated-TodoTimer');
  // },
  created() {
    console.log('created-TodoTimer');
    if(isNaN(this.totalTime)) {
      console.log('새로고침한 경우');
      let json = sessionStorage.getItem('total-time');
      this.totalTime = parseInt(json,10);
    } else {
      console.log('정상작동');
      sessionStorage.setItem('total-time', this.totalTime);
    };
    console.log('a');
    this.timeAnimation = this.totalTime;
    (sessionStorage.getItem('timer-status') !== null)&& this.showButtons();
    // this.showButtons();
  },
  // beforeMount () {
  //   console.log('beforeMount-TodoTimer');
  // },
  mounted () {
    console.log('mounted-TodoTimer');
    ((this.timerStatus === 'ongoing')||(this.timerStatus === null))&&(this.startTimer());
    (this.timerStatus === 'off')&&(this.offTimerCondition());
  },
  beforeUpdate () {
    console.log('beforeUpdate-TodoTimer');
    sessionStorage.setItem('total-time', this.totalTime);
    (this.totalTime === 0)&&(this.offTimer(0, 3000));
    this.timeAnimation = this.totalTime;
  },
  methods: {
    twoDigitTime (time) {
      return (time < 10 ? '0' : '') + time;
    },
    startTimer () {
      this.timer = setInterval(() => this.totalTime--, 1000);
      sessionStorage.setItem('timer-status','ongoing');
    },
    pauseTimer (param) {
      clearInterval(this.timer);
      sessionStorage.setItem('timer-status','pausing')
      this.on = false;
    },
    restartTimer () {
      this.timer = setInterval(() => this.totalTime--, 1000);
      sessionStorage.setItem('timer-status','ongoing');
      this.on = true;
    },
    offTimer (totalTime, delayTime) {
      sessionStorage.setItem('timer-status','off');
      clearInterval(this.timer);
      this.totalTime = totalTime;
      this.buttons = false;
      setTimeout(()=> this.$emit('deleteTodo'), delayTime);
    },
    offTimerCondition () {
      if(this.totalTime === -999) {
        console.log('-999');
        this.$emit('deleteTodo');
      } else if( this.totalTime === 0 ) {
        console.log('0');
        setTimeout(()=> this.$emit('deleteTodo'), 3000);
      } else {
        console.error('-999도 0도,타이머가 끝났을 때, 새로고침 안한경우');
      }
    },
    showButtons () {
      this.timerStatus = sessionStorage.getItem('timer-status');
      if(this.timerStatus === 'pausing' ) {
        this.on = false;
        return
      } else if ( this.timerStatus === 'off' ) {
        this.buttons = false;
        return
      } else {
        console.log(this.on, this.buttons);
        return
      }
    }
  },
  computed: {
    hours () {
      if(this.totalTime !== -999) {
        const hours = Math.floor(this.totalTime / (60*60));
        return this.twoDigitTime(hours);   
      } else {
        return this.twoDigitTime(0);
      }
    },
    minutes () {
      if(this.totalTime !== -999) {
        const minutes = Math.floor((this.totalTime - (this.hours * 60 * 60)) / 60);
        return this.twoDigitTime(minutes);
      } else {
        return this.twoDigitTime(0);
      }
    },
    seconds () {
      if(this.totalTime !== -999) {
        const seconds = this.totalTime - (this.hours * 60 *60) - (this.minutes * 60);
        return this.twoDigitTime(seconds);
      } else {
        return this.twoDigitTime(0);
      }
    }
  }
}
</script>

<style scoped>
@import "./todo-timer.css"
</style>