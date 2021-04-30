<template>
  <div class="todo-flex editTodo-page">
    <section class="todo-form-wrapper">
      <todo-form 
        type="edit" 
        :item="todoItem">
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
