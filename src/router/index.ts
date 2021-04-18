import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
//
import HelloWorld from "../pages/HelloWorld.vue";
import About from "../pages/About.vue";
import Modal from "../pages/Modal.vue";
import CalendarTest from "../pages/CalendarTest.vue";
//Main files
import Calendar from "../pages/calendar/Calendar.vue";
import CreateTodo from "../pages/createTodo/CreateTodo.vue";
import EditTodo from "../pages/editTodo/EditTodo.vue";
import TodoForm from "../pages/TodoForm.vue"

// const router = VueRouter.createRouter({
//   // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
//   history: VueRouter.createWebHashHistory(),
//   routes, // short for `routes: routes`
// })
const routes: Array<RouteRecordRaw> = [
  {
    path: "/helloWorld",
    name: "helloWorld",
    component: HelloWorld
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/modal",
    name: "modal",
    component: Modal
  },
  {
    path: "/calendarTest",
    name: "calendarTest",
    component: CalendarTest
  },
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