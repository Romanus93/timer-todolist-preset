<template>
  <main class="todo-flex edit-form">
    <div class="advice">
      <!-- 명언 랜덤으로 뿌리기 -->
      <p>
        미래의 '8년'에 신경쓰지 말고,<br />
        코앞의 '8일'에 집중하는 삶을 살라.<br />
        -개리 베이너척-
      </p>
    </div>
    <ul class="todo-flex todo-info">
      <li class="todo-flex todo-title">
        <label for="title">오늘 할 일</label>
        <input
          type="text"
          id="title"
          name="todo-title"
          v-model.trim="todolist.title"
        />
      </li>
      <li class="todo-flex todo-content">
        <label for="description">할 일 내용</label>
        <input
          type="text"
          id="description"
          name="todo-content"
          v-model.trim="todolist.description"
        />
      </li>
      <li>
        <label for="time">Time</label>
        <input
          type="number"
          id="time"
          name="todo-time"
          v-model.number="todolist.time"
        />
      </li>
    </ul>
    <ul class="todo-flex buttons-wrapper">
      <li>
        <button class="button--edit" @click="editTodo">
          <i class="far fa-edit"></i>
        </button>
      </li>
      <li>
        <button class="button--home" @click="goCalendarPage">
          <i class="fas fa-home"></i>
        </button>
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import moment from "moment";
import axios from "axios";

interface Todolist {
  date: string;
  title: string;
  description: string;
  time: number;
  id: number;
}

export default defineComponent({
  name: "EditTodo",
  props: {
    todolistData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      todolist: {
        title: this.todolistData.title,
        description: this.todolistData.description,
        time: this.todolistData.time,
        id: this.todolistData.id,
        date: this.todolistData.date
      },
      forVerificationTodolist: this.todolistData
    }
  },
  methods: {
    async axiosPatch(): Promise<void> {
      await axios
        .patch(`http://localhost:3005/todolists/${this.todolist.id}`, {
          title: this.todolist.title,
          description: this.todolist.description,
          time: this.todolist.time,
          id: this.todolist.id
        })
        .then(response => {
          console.debug(response);
        })
        .catch(error => {
          console.debug(error);
        });
      console.debug("b");
    },
    editTodo() {
      console.log("editTodo");
      if (
        (this.todolist.title === this.forVerificationTodolist.title) &&
        (this.todolist.description === this.forVerificationTodolist.description) &&
        (this.todolist.time  === this.forVerificationTodolist.time)
      ) {
        this.goCalendarPage();
      } else {
        this.axiosPatch();
        this.goCalendarPage();
      }
    },
    goCalendarPage(): void {
      console.log("goCalendarPage");
      this.compareDates();
    },
    compareDates(): void {
      const today: string = moment(new Date()).format("YYYY-MM-DD");
      if(today == this.todolist.date) {
        this.$router.push({name: "Calendar" });
      } else {
        this.$router.push({name: "Calendar", params: { todolistDate: this.todolist.date }})
      }
    }
  }
});
</script>

<style scoped>
@import "./edit-todo.css";
</style>
