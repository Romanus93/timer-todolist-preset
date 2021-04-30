section<template>
  <section>
    <div class="container todo-timer-wrapper">
      <TodoTimer 
        :todoTime= todoTime
        @checkTime="checkTime"
      />
    </div>
    <div class="container todo-timer-animation-wrapper">
      <timer-animation 
        :time="time"
      />
    </div>
    <div class="container todo-button-wrapper">
      <button type="button" @click="goCalendarPage">완료</button>
    </div>
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
      time: null
    }
  },
  computed: {
    todoTime() {
      console.log('computed');
      console.log(typeof this.todoItem.hours, typeof this.todoItem.minutes, typeof this.todoItem.seconds);
      let integer = this.todoItem.hours*3600 + this.todoItem.minutes*60 + this.todoItem.seconds;
      return parseInt(integer,10);
    }
  },

  beforeCreate() {
    console.log('beforeCreate');
    console.log(this.$route);
    console.log(this.todoTime);
    console.log(this.fullTime);
  },
  created () {
    console.log('created');
    console.log(this.$route);
    console.log(this.todoItem);
    console.log(typeof this.todoItem.hours, typeof this.todoItem.minutes, typeof this.todoItem.seconds);
  },
  beforeMount () {
    console.log('beforeMount');
  },
  mounted () {
    console.log('mounted');    
  },
  beforeUpdate () {
    console.log('beforeUpdate');
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
      }
  },
} 
</script>

<style  scoped>
  .container {
    border: tomato 5px solid;
  }
</style>