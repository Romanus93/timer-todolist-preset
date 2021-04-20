<template>
  <main class="todo-flex input-form">
    <div class="advice">
      <!-- 명언 랜덤으로 뿌리기 -->
      <p>어디를 가든 마음을 다해 가라.<br />-공자-</p>
    </div>
    <todo-form 
      type="create"
      :todoItemDate="todoItemDate" 
    ></todo-form>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoForm from '../../components/todoForm/TodoForm.vue';

interface Todolist {
  date: string;
  title: string;
  description: string;
  time: number;
  id?: number;
}

export default defineComponent({
  components: { TodoForm },
  name: 'CreateTodo',
  props: {
    todoItemDate: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
@import "./create-todo.css";
</style>
