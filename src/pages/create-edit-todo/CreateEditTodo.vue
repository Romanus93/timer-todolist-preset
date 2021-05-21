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
  created () {
    this.selectType();
  },
  methods: {
    selectType () :void {
      console.log(this.$route.params);
      if(this.$route.params.type) {
      this.sessionSetItem(this.$route.params);
      this.todo = this.$route.params;
    } else {
      this.sessionGetItem()
    }
    },
    sessionSetItem (params: object) {
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