section<template>
  <main class="start-todo-page">
      <TodoTimer 
        :todoTime="todoTime"
        @deleteTodoItem="deleteTodoItem"
      />
  </main>
</template>

<script>
import TodoTimer from "/src/components/todo-timer/TodoTimer.vue"
import TimerAnimation from "/src/components/timer-animation/TimerAnimation.vue"
import axios from "axios"
import moment from "moment"

export default {
  name: 'StartTodo',
  components: {
    TodoTimer,
    TimerAnimation
  },
  props: {
    hours: {
      type: String
    },
    minutes: {
      type: String
    },
    seconds: {
      type: String
    }
  },
  created () {
    console.log('startTodo');
  },
  computed: {
    todoTime() {
      let integer = parseInt(this.hours,10)*3600 + parseInt(this.minutes,10)*60 + parseInt(this.seconds,10);
      console.log('computed',integer)
      return integer
    }
  },
  methods: {
    async deleteTodoItem() {
      const res = await axios
        .delete(`http://localhost:3005/todolist/${this.todoItem.id}`)
        .then(response => {
          console.debug(response.data);
        })
        .catch(error => {
          console.debug(error);
        });
      this.goCalendarPage();
    },
    goCalendarPage() {
      console.log('go calendar-page');
      const today = moment(new Date()).format("YYYY-MM-DD");
      console.log(today);
      (today == this.todoItem.date )? this.$router.push({name: "Calendar" }) : this.$router.push({name: "Calendar", params: {dateOfTodoItem: this.todoItem.date} });
    }
  }
} 
</script>

<style  scoped>
  @import "./start-todo.css";
</style>