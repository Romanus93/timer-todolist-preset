import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Calendar from "../pages/calendar/Calendar.vue";
import Expage from "../pages/Expage.vue";
import StartTodo from "../pages/startTodo/StartTodo.vue"
import CreateEditTodo from "../pages/create-edit-todo/CreateEditTodo.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Calendar",
    props:true,
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
    props: (route) => ({ todoItem: route.params }),
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