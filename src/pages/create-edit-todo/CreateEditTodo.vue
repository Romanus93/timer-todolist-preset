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
      todoitem: { } as object
    }
  },
  beforeCreate(){
    console.log('brforeCreated--editTodo-page');
    console.log(this.$route.params.type);
    console.log(this.sessionSetItem);
  },
  created () {
    console.log('created--editTodo-page');
    console.log(this.todoitem);
    if(this.$route.params.type) {
      console.log('$route.params.type 존재',this.$route.params.type);
      this.sessionSetItem(this.$route.params);
      console.log('todoitem',this.todoitem);
      this.todoitem = this.$route.params;
      console.log('todoitem',this.todoitem);
    } else {
      console.log('$route.params.type 존재 안함',this.$route.params.type);
      this.sessionGetItem()
    }
    console.log('created 에서 함수 실행했음');
    
  },
  beforeMount () {
    console.log('beforeMount--editTodo-page');
    console.log(this.todoitem);
  },
  mounted () {
    console.log('mounted--editTodo-page');
  },
  beforeUpdate () {
    console.log('beforeUpdate--editTodo-page');
  }, 
  methods: {
    sessionSetItem(params: object) {
      console.log('aa');
      let todoitem:string = JSON.stringify(params);
      sessionStorage.setItem('todoitem',todoitem);
    },
    sessionGetItem(){
      let json: any = sessionStorage.getItem('todoitem');
      // let todoitem:object = JSON.parse(json);
      this.todoitem = JSON.parse(json);
    }
  }, 
});
</script>

<style scoped>
@import "./create-edit-todo.css";
</style>