<template>
  <main class="todo-flex create-edit-todo-page">
    <todo-form 
      :todoitem="todoitem"
    ></todo-form>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoForm from '/src/components/todo-form/TodoForm.vue';

export default defineComponent({
  components: { TodoForm },
  name: 'CreateEditTodo',
  data() {
    return {
      todoitem: this.$route.params
    }
  },
  beforeCreate(){
    console.log('brforeCreated--editTodo-page');
  },
  created () {
    console.log('created--editTodo-page');
    console.log(this.todoitem);
    console.log(this.$route);
  },
  beforeMount () {
    console.log('beforeMount--editTodo-page');
  },
  mounted () {
    console.log('mounted--editTodo-page');
  },
  beforeUpdate () {
    console.log('beforeUpdate--editTodo-page');
  }  
});
</script>

<style scoped>
@import "./create-edit-todo.css";
</style>