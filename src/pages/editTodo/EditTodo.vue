<template>
  <main class="todo-flex edit-form">
    <div class="advice">
      <!-- 명언 랜덤으로 뿌리기 -->
      <p>어디를 가든 마음을 다해 가라.<br />-공자-</p>
    </div>
    <todo-form 
      type="edit" 
      :item="todolistData">
    </todo-form>
  </main>
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
    console.log('edit Page');
    console.log(this.todolistData);
  },
  // data() {
  //   return {
  //     todolist: {
  //       date: this.todolistData.date,
  //       title: this.todolistData.title,
  //       description: this.todolistData.description,
  //       time: this.todolistData.time,
  //       id: this.todolistData.id
  //     } ,
  //     verificationTodolist: this.todolistData,
  //     route: {}
  //   }
  // },
  // created () {
  //   console.log(`createTodo` + this.$route)
  //   console.log(this.$route.path)
  // },
  // computed: {
  //   routeData(): any {
  //     console.debug('computed');
  //     this.route = this.$route.path
  //     return this.route 
  //   }
  // },
  // methods: {
  //   editTodo() {
  //     console.log("editTodo");
  //     if (
  //       (this.todolist.title === this.verificationTodolist.title) &&
  //       (this.todolist.description === this.verificationTodolist.description) &&
  //       (this.todolist.time  === this.verificationTodolist.time)
  //     ) {
  //       this.goCalendarPage();
  //     } else {
  //       this.goCalendarPage();
  //     }
  //   },
  //   goCalendarPage(): void {
  //     this.compareDates();
  //   },
  //   compareDates(): void {
  //     const today: string = moment(new Date()).format("YYYY-MM-DD");
  //     if(today == this.todolist.date) {
  //       this.$router.push({name: "Calendar" });
  //     } else {
  //       this.$router.push({name: "Calendar", params: { todolistDate: this.todolist.date }})
  //     }
  //   }
  // }
});
</script>

<style scoped>
@import "./edit-todo.css";
</style>
