import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Calendar from "/src/pages/calendar/Calendar.vue";
import Expage from "/src/pages/Expage.vue";
import StartTodo from "/src/pages/start-todo/StartTodo.vue"
import CreateEditTodo from "/src/pages/create-edit-todo/CreateEditTodo.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Calendar",
    component: Calendar
  },
  {
    path: "/exPage",
    name: "Expage",
    component: Expage
  },
  {
    path: "/startTodo",
    name: "StartTodo",
    props: true,
    component: StartTodo
  },
  {
    path:"/:path",
    name: "CreateEditTodo",
    props:true,
    component: CreateEditTodo
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;