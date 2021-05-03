section<template>
  <section>
    <div class="container todo-timer-wrapper">
      <TodoTimer 
        :todoTime="todoTime"
        @deleteTodoItem="deleteTodoItem"
      />
    </div>
  </section>
</template>

<script>
import TodoTimer from "../../components/todoTimer/TodoTimer.vue"
import TimerAnimation from "../../components/timerAnimation/TimerAnimation.vue"
import axios from "axios"
import moment from "moment"

export default {
  name: 'StartTodo',
  components: {
    TodoTimer,
    TimerAnimation
  },
  props: {
    todoItem: {
      type: Object,
      required: true
    }
  },
  computed: {
    todoTime() {
      let integer = this.todoItem.hours*3600 + this.todoItem.minutes*60 + this.todoItem.seconds;
      return parseInt(integer,10);
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
      const today = moment(new Date()).format("YYYY-MM-DD");
      (today == this.todoItem.date )? this.$router.push({name: "Calendar" }) : this.$router.push({name: "Calendar", params: {dateOfTodoItem: this.todoItem.date} });
    }
  }
} 
</script>

<style  scoped>
  .container {
    border: tomato 5px solid;
  }
</style>