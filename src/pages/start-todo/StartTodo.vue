section<template>
  <main class="start-todo-page">
      <TodoTimer 
        :todoTime="todoTime"
        @deleteTodo="deleteTodo"
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
    },
    id: {
      type: String
    },
    date: {
      type: String
    }
  },
  data () {
    return {
      todoId: this.id,
      todoDate: this.date
    }
  },
  created () {
    (this.todoId)&&( sessionStorage.setItem('id',this.todoId) );
    (this.todoDate)&& ( sessionStorage.setItem('date',this.todoDate) );
  },
  computed: {
    todoTime () {
      let totalTime = parseInt(this.hours,10)*3600 + parseInt(this.minutes,10)*60 + parseInt(this.seconds,10);
      return totalTime
    }
  },
  methods: {
    async deleteTodo () {
      (this.todoId === undefined)&&(this.getItem('id'));
      const res = await axios
        .delete(`http://localhost:3005/todolist/${this.todoId}`)
        .then(response => {
          console.debug(response.data);
        })
        .catch(error => {
          console.debug(error);
        });
      this.goCalendar();
    },
    getItem (key) {
      if(key === 'id') {
        let json = sessionStorage.getItem('id');
        this.todoId = json;
        return
      } else {
        console.log('key === date', key === 'date')
        let json = sessionStorage.getItem('date');
        this.todoDate = json;
        return
      }
    },
    goCalendar () {
      (this.todoDate === undefined)&&(this.getItem('date'));
      let today = moment(new Date()).format("YYYY-MM-DD");
      (today == this.todoDate )? this.$router.push({name: "Calendar" }) : this.$router.push({name: "Calendar", params: {todoDate: this.todoDate} });
      sessionStorage.clear();
    }
  }
} 
</script>

<style  scoped>
  @import "./start-todo.css";
</style>