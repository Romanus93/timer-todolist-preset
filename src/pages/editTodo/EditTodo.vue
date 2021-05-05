<template>
  <div class="todo-flex edit-todo-page">
    <todo-form 
      type="edit" 
      :item="todoItem"
    ></todo-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoForm from '../../components/todoForm/TodoForm.vue';

export default defineComponent({
  components: { TodoForm },
  name: "EditTodo",
  props: {
    todoItem: {
      type: Object,
      required: true
    }
  },
  created () {
    console.log(this.$route);
    console.log('created - editodo');
    console.log(this.todoItem.time);
  },
});
</script>

<style scoped>
@import "./edit-todo.css";
</style>
