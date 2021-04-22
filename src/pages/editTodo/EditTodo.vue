<template>
  <div class="todo-flex editTodo-page">
    <section class="todo-motivation">
      <!-- 명언 랜덤으로 뿌리기 -->
      <p>어디를 가든 마음을 다해 가라.<br />-공자-</p>
    </section>
    <section class="todo-info">
      <todo-form 
        type="edit" 
        :item="todolistData">
      </todo-form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoForm from '../../components/todoForm/TodoForm.vue';

export default defineComponent({
  components: { TodoForm },
  name: "EditTodo",
  props: {
    todolistData: {
      type: Object,
      required: true
    }
  }
});
</script>

<style scoped>
@import "./edit-todo.css";
</style>
