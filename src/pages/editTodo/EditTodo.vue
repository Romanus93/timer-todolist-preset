<template>
  <div class="todo-flex editTodo-page">
    <section class="todo-form-wrapper">
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
  },
  created () {
    console.log(this.$route);
    console.log('created - editodo');
    console.log(this.todolistData.time);
  },
});
</script>

<style scoped>
@import "./edit-todo.css";
</style>
