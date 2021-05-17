<template>
  <main class="todo-flex create-edit-todo-page">
    <todo-form 
      :todo="todo"
    ></todo-form>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoForm from '/src/components/todo-form/TodoForm.vue';

export default defineComponent({
  components: { TodoForm },
  name: 'CreateEditTodo',
  data () {
    return {
      todo: { } as object
    }
  },
  // beforeCreate(){
  //   console.log('brforeCreated--editTodo-page');
  //   console.log(this.$route.params.type);
  //   console.log(this.sessionSetItem);
  // },
  created () {
    console.log('created--editTodo-page');
    console.log(this.todo);
    if(this.$route.params.type) {
      console.log('$route.params.type 존재',this.$route.params.type);
      this.sessionSetItem(this.$route.params);
      console.log('todo',this.todo);
      this.todo = this.$route.params;
      console.log('todo',this.todo);
    } else {
      console.log('$route.params.type 존재 안함',this.$route.params.type);
      this.sessionGetItem()
    }
    console.log('created 에서 함수 실행했음');
    
  },
  beforeMount () {
    console.log('beforeMount--editTodo-page');
    console.log(this.todo);
  },
  // mounted () {
  //   console.log('mounted--editTodo-page');
  // },
  // beforeUpdate () {
  //   console.log('beforeUpdate--editTodo-page');
  // }, 
  methods: {
    sessionSetItem (params: object) {
      console.log('aa');
      let todo:string = JSON.stringify(params);
      sessionStorage.setItem('todo',todo);
    },
    sessionGetItem () {
      let json: any = sessionStorage.getItem('todo');
      this.todo = JSON.parse(json);
    }
  }, 
});
</script>

<style scoped>
@import "./create-edit-todo.css";
</style>