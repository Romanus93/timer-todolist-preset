<template>
  <main class="todo-flex input-form">
    <!-- <div class="advice">
      명언 랜덤으로 뿌리기
      <p>어디를 가든 마음을 다해 가라.<br />-공자-</p>
    </div> -->
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
        <button class="button--create" @click="createTodo">
          <i class="fas fa-plus"></i>
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
import axios from "axios";

interface Todolist {
  date: string;
  title: string;
  description: string;
  time: number;
}

export default defineComponent({
  name: 'InputForm',
  props: {
    todolistDate: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      todolist: {
        date: this.todolistDate,
        title: " ",
        description: " ",
        time: 0
      } as Todolist
    };
  },
  methods: {
    async axiosPost(): Promise<void> {
      await axios
        .post("http://localhost:3005/todolists", {
          date: this.todolist.date,
          title: this.todolist.title,
          description: this.todolist.description,
          time: this.todolist.time
        })
        .then(response => {
          console.debug(response.data);
        })
        .catch(error => {
          console.debug(error);
        });
    },
    goCalendarPage(): void {
      this.$router.push({ name: "Calendar" });
    },
    createTodo(): void {
      if (
        (this.todolist.time > 0) &&
        (this.todolist.title != "") &&
        (this.todolist.description != "")
      ) {
        this.axiosPost();
        this.$router.push({ name: "Calendar" });
      } else {
        alert("값을 확인해주세요!");
      }
    }
  }
});
</script>

<style scoped>
@import "./TodoForm.css";
</style>
