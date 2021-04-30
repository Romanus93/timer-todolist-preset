<template>
  <div>
    <div>
      <TodoTimer 
        :todoTime= todoTime
      />
    </div>
    <div class="container">
      <timer-animation />
    </div>
    <div class="container">
      <button type="button" @click="goCalendarPage">완료</button>
    </div>
  </div>
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
  computed: {
    todoTime() {
      console.log('computed');
      console.log(typeof this.todoItem.hours, typeof this.todoItem.minutes, typeof this.todoItem.seconds);
      return this.todoItem.hours*3600 + this.todoItem.minutes*60 + this.todoItem.seconds;
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
    }
  },
} 
</script>

<style  scoped>
  .container {
    border: tomato 5px solid;
  }
</style>