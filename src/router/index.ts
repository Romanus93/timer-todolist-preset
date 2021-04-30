import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Calendar from "../pages/calendar/Calendar.vue";
import CreateTodo from "../pages/createTodo/CreateTodo.vue";
import EditTodo from "../pages/editTodo/EditTodo.vue";
import Expage from "../pages/Expage.vue";
import StartTodo from "../pages/startTodo/StartTodo.vue"

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
    props: (route) => ({ todoItem: route.params }),
    component: EditTodo
  },
  {
    path: "/exPage",
    name: "Expage",
    component: Expage
  },
  {
    path: "/startTodo",
    name: "StartTodo",
    props: (route) => ({ todoItem: route.params }),
    component: StartTodo
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;