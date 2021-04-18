import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Calendar from "../pages/calendar/Calendar.vue";
import CreateTodo from "../pages/createTodo/CreateTodo.vue";
import EditTodo from "../pages/editTodo/EditTodo.vue";
import TodoForm from "../pages/TodoForm.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Calendar",
    // props: true,
    component: Calendar
  },
  {
    path: "/createTodo",
    name: "CreateTodo",
    props: true,
    component: CreateTodo
  },
  {
    path: "/editTodo",
    name: "EditTodo",
    props: (route) => ({ todolistData: route.params }),
    component: EditTodo
  },
  //연습용
  {
    path: "/todoForm",
    name: "TodoForm",
    component: TodoForm
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;