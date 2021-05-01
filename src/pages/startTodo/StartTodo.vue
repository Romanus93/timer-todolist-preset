section<template>
  <section>
    <div class="container todo-timer-wrapper">
      <TodoTimer 
        :todoTime="todoTime"
        @checkTime="checkTime"
      />
    </div>
    <div class="container todo-timer-animation-wrapper">
      <timer-animation 
        :time="time"
      />
    </div>
    <div class="container todo-button-wrapper">
      <button style="width: 100px; height: 100px;" type="button" @click="stopTimer(true)">STOP</button>
    </div>
    <!-- <div class="container todo-button-wrapper">
      <button type="button" @click="goCalendarPage">완료</button>
    </div> -->
  </section>
</template>

<script>
import TodoTimer from "../../components/todoTimer/TodoTimer.vue"
import TimerAnimation from "../../components/timerAnimation/TimerAnimation.vue"
import axios from "axios"

export default {
  components: {
    TodoTimer,
    TimerAnimation
  },
  props: {
    todoItem: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      time: null,
      stop: false
    }
  },
  computed: {
    todoTime() {
      console.log('todoIime', this.stop);
      if(this.stop == true) {
        return -999
        } else {
        let integer = this.todoItem.hours*3600 + this.todoItem.minutes*60 + this.todoItem.seconds;
        return parseInt(integer,10);
      }
    }
  },

  beforeCreate() {
    console.log('beforeCreate');
  },
  created () {
    console.log('created');
  },
  beforeMount () {
    console.log('beforeMount');
    console.log('checkTime', this.time);

  },
  mounted () {
    console.log('mounted');    
  },
  beforeUpdate () {
    console.log('beforeUpdate');
    console.log('checkTime', this.time);

  },
  methods: {
    async goCalendarPage() {
      const res = await axios
        .delete(`http://localhost:3005/todolist/${this.todoItem.id}`)
        .then(response => {
          console.debug(response.data);
        })
        .catch(error => {
          console.debug(error);
        });
      this.$router.push({ name: "Calendar" });
    },
    checkTime (param) {
        console.log('checkTime', param);
        this.time = param;
    },
    stopTimer (param) {
      console.log('a', param);
      this.stop = param;
    }
  },
} 
</script>

<style  scoped>
  .container {
    border: tomato 5px solid;
  }
</style>