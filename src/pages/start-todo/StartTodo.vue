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
  beforeCreate () {
    console.log('beforeCreated-startTodo');
  },
  created () {
    console.log('created-startTodo');
    // console.log('startTodo');
    // console.log('$route',this.$route);
    // console.log('id',this.$route.params.id,typeof this.$route.params.id);
    (this.todoId)&&( sessionStorage.setItem('id',this.todoId) );
    (this.todoDate)&& ( sessionStorage.setItem('date',this.todoDate) );
    // let json = sessionStorage.getItem('timer-status')
    // (json==='off') && ( this.goCalendarPage);
  },
  beforeMount() {
    console.log('beforeMount-startTodo');
  },
  mounted() {
    console.log('mounted-startTodo');
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
      console.log('this.todoId',this.todoId);
      if(this.todoId === undefined) {
        console.log('a');
        let json = sessionStorage.getItem('id');
        this.todoId = json
        console.log(this.todoId);
      }
      const res = await axios
        .delete(`http://localhost:3005/todolist/${this.todoId}`)
        .then(response => {
          console.debug(response.data);
          console.log('axios-delete');
        })
        .catch(error => {
          console.debug(error);
        });
      console.log('goCalendarPage');
      this.goCalendarPage();
    },
    goCalendarPage() {
      console.log('go calendar-page');
      const today = moment(new Date()).format("YYYY-MM-DD");
      console.log(today);
      console.log('this.date',this.todoDate);
      if(this.todoDate === undefined) {
        console.log('a');
        let json = sessionStorage.getItem('date');
        console.log(json);
        this.todoDate = json;
        console.log(this.todoDate);
      }
      console.log(this.todoDate);
      (today == this.todoDate )? this.$router.push({name: "Calendar" }) : this.$router.push({name: "Calendar", params: {dateOfTodoItem: this.todoDate} });
      sessionStorage.removeItem('date');
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('timer-status');
      sessionStorage.removeItem('total-time');
    }
  }
} 
</script>

<style  scoped>
  @import "./start-todo.css";
</style>