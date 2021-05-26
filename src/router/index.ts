import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Calendar from "/src/pages/calendar/Calendar.vue";
import StartTodo from "/src/pages/start-todo/StartTodo.vue"
import CreateEditTodo from "/src/pages/create-edit-todo/CreateEditTodo.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Calendar",
    component: Calendar
  },
  {
    path: "/startTodo",
    name: "StartTodo",
    props: true,
    meta: { transition: 'slide-left' },
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