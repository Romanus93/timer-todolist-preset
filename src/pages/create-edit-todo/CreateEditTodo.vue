<template>
  <main class="todo-flex create-edit-todo-page">
    <todo-form 
      :todoitem="todoitem"
    ></todo-form>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoForm from '../../components/todoForm/TodoForm.vue';

export default defineComponent({
  components: { TodoForm },
  name: 'CreateTodo',
  data() {
    return {
      todoitem: this.$route.params
    }
  },
  beforeCreate(){
    console.log('brforeCreated--CopyTodo-page');
  },
  created () {
    console.log('created--CopyTodo-page');
    console.log(this.todoitem);
    console.log(this.$route);
  },
  beforeMount () {
    console.log('beforeMount--CopyTodo-page');
  } 
});
</script>

<style scoped>
@import "./create-edit-todo.css";
</style>