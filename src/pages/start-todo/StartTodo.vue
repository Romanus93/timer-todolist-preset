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
    },
    id: {
      type: String
    },
    date: {
      type: String
    }
  },
  data() {
    return {
      todoId: this.id,
      todoDate: this.date
    }
  },
  // beforeCreate () {
  //   console.log('beforeCreated-startTodo');
  // },
  created () {
    // console.log('created-startTodo');
    (this.todoId)&&( sessionStorage.setItem('id',this.todoId) );
    (this.todoDate)&& ( sessionStorage.setItem('date',this.todoDate) );
  },
  // beforeMount() {
  //   console.log('beforeMount-startTodo');
  // },
  // mounted() {
  //   console.log('mounted-startTodo');
  // },
  computed: {
    todoTime() {
      let integer = parseInt(this.hours,10)*3600 + parseInt(this.minutes,10)*60 + parseInt(this.seconds,10);
      console.log('computed',integer)
      return integer
    }
  },
  methods: {
    async deleteTodoItem() {
      this.getItem('id');
      const res = await axios
        .delete(`http://localhost:3005/todolist/${this.todoId}`)
        .then(response => {
          console.debug(response.data);
          console.log('axios-delete');
        })
        .catch(error => {
          console.debug(error);
        });
      this.goCalendarPage();
    },
    getItem(key) {
      if((key === 'id')&&(this.todoId === undefined)) {
        let json = sessionStorage.getItem('id');
        this.todoId = json;
        return
      } else if ((key ==='date')&&(this.todoDate === undefined)) {
        let json = sessionStorage.getItem('date');
        this.todoDate = json;
        return
      } else {
        console.log('this.todoDate가 undefined가 아님.');
        return
      }
    },
    goCalendarPage() {
      const today = moment(new Date()).format("YYYY-MM-DD");
      this.getItem('date');
      (today == this.todoDate )? this.$router.push({name: "Calendar" }) : this.$router.push({name: "Calendar", params: {dateOfTodoItem: this.todoDate} });
      sessionStorage.clear();
      // sessionStorage.removeItem('date');
      // sessionStorage.removeItem('id');
      // sessionStorage.removeItem('timer-status');
      // sessionStorage.removeItem('total-time');
    }
  }
} 
</script>

<style  scoped>
  @import "./start-todo.css";
</style>