<template>
  <div class="todo-flex createTodo-page">
    <section class="todo-motivation">
      <!-- 명언 랜덤으로 뿌리기 -->
      <p>어디를 가든 마음을 다해 가라.<br />-공자-</p>
    </section>
    <section class="todo-info">
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