import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Calendar from "../pages/calendar/Calendar.vue";
import CreateTodo from "../pages/createTodo/CreateTodo.vue";
import EditTodo from "../pages/editTodo/EditTodo.vue";
import Expage from "../pages/Expage.vue";
import StartTodo from "../pages/startTodo/StartTodo.vue"
import CopyTodo from "../pages/copyTodo/CopyTodo.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Calendar",
    props:true,
    component: Calendar
  },
  {
    path: "/createTodo",
    name: "CreateTodo",
    props: (route) => ({ dateOfTodoItem: route.params.dateOfTodoItem }),
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
  },
  {
    path:"/:path",
    name: "CopyTodo",
    // props: (route) => (
    //   {
    //     type: route.params.type,
    //     todoItem: route.params.todoItem,
    //     dateOfTodoItem: route.params.dateOfTodoItem,
    //     path: route.params.path
    //   }
    // ),
    props:true,
    component: CopyTodo
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;