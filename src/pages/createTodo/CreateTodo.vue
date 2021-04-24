<template>
  <div class="todo-flex createTodo-page">
    <section class="todo-form-wrapper">
      <todo-form 
        type="create"
        :dateOfTodoItem="dateOfTodoItem" 
      ></todo-form>
    </section>
  </div>
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