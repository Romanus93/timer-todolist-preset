<template>
  <div>
    <!-- ex create -->
    <todoform
      :todolist="todolistData"
      :createPage="createPage"
      :edit
    ></todoform>
    <!-- ex edit -->

<ul class="todo-flex todo-info">
      <li class="todo-flex todo-title">
        <label for="title">오늘 할 일</label>
        <input
          type="text"
          id="title"
          name="todo-title"
          v-model.trim="todolists.title"
        />
      </li>
      <li class="todo-flex todo-content">
        <label for="description">할 일 내용</label>
        <input
          type="text"
          id="description"
          name="todo-content"
          v-model.trim="todolists.description"
        />
      </li>
      <li>
        <label for="time">Time</label>
        <input
          type="number"
          id="time"
          name="todo-time"
          v-model.number="todolists.time"
        />
      </li>
    </ul>



  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    todolist: {
      type: Object,
      required: true
    },
    route: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      todolists: this.todolist,
      routes : this.route,
      createPage : false,
      editPage : false
      // computed에서 할지 createHook에서 할지
    }
  },
  computed: {
    routesChecking() {
      if(this.routes === "/createTodo") {
        this.createPage = true
      }
      return
    },
    createPage() {
      (this.routes === "/createTodo")? true: false      
    },
    editpPage() {
      (this.routes === "/editTodo")? true: false      
    }
  },
  methods: {
    editCreateTodo() {
      if(this.routes === "/createTodo") {
        createTodo()
      } else if (this.routes === "/editTodo") {
        editTodo()
      }
    }
  },
})
</script>

<style scoped>

</style>