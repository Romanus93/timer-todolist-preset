<template>
  <main class="todo-flex create-todo-page">
    <todo-form 
      type="create"
      :dateOfTodoItem="dateOfTodoItem" 
    ></todo-form>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoForm from '../../components/todoForm/TodoForm.vue';

export default defineComponent({
  components: { TodoForm },
  name: 'CreateTodo',
  props: {
    dateOfTodoItem: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
@import "./create-todo.css";
</style>