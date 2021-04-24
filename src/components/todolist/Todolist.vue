<template>
  <div class="todo-flex todolist-component">
    <ul class="todo-list" v-show="!hasTodoItemModal">
      <swiper
        :slides-per-view="1"
        :space-between="50"
        :pagination="{ clickable: false }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide v-for="(item, index) in todolist" :key="index">
          <li class="todo-item todo-flex">
            <div>Title : {{ item.title }}</div>
            <div>description : {{ item.description }}</div>
            <div>time : {{ item.time }}</div>
            <div>
              <button type="button" class="start-button">
                <i class="fas fa-running"></i>
              </button>
            </div>
            <div class="edit-delete-modal-button-wrapper">
              <button type="button" class="edit-delete-modal-button" @click="showEditDeleteModal(true, item)">
                <i class="fas fa-ellipsis-h"></i>
              </button>
            </div>
          </li>
        </swiper-slide>
      </swiper>
      <li class="edit-delete-modal" v-show="hasEditDeleteModal" >
        <ul class="todo-flex">
          <li>
            <button type="button" class="delete-button button--modal" @click="deleteItem(todoItem)">
              <i class="fas fa-trash-alt"></i> 삭제하기
            </button>
          </li>
          <li>
            <button type="button" class="edit-button button--modal"  @click="goEditTodoPage(todoItem)">
              <i class="fas fa-eraser"></i> 수정하기
            </button>
          </li>
          <li>
            <button type="button" class="cancle-button button--modal" @click="showEditDeleteModal(false)">
              <i class="fas fa-times"></i> 취소
            </button>
          </li>
        </ul>
      </li>
    </ul>
    <div class="todo-item-none-modal" v-show="hasTodoItemModal">
    </div>
    <div class="todo-item-none-modal" style="color: blue;" v-show="loadingPage">
      <h1>loading page</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// import Swiper core and required modules
import SwiperCore, { Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

 // install Swiper modules
SwiperCore.use([Pagination, Scrollbar, A11y]);

interface TodoItem {
  title: string;
  description: string;
  time: number;
  id: number;
  date: string;
}

declare module "axios" {
  interface AxiosRequestConfig {
    title: string;
    description: string;
    time: number;
    id: number;
    date?: string;
  }
}

export default defineComponent({
  name: 'TodoList',
  props: {
    // date: {
    //   type: Object,
    //   required: true
    // },
    inputedDay: {
      type: [ Object, String ],
      required: true
    }
  },
  components: {
      Swiper,
      SwiperSlide,
    },
  data() {
    return {
      todolist: [] as object[],
      hasEditDeleteModal: false,
      todoItem: {} as object,
      loading: false
    }
  },
  computed: {
    hasTodoItemModal(): boolean {
      console.log('computed 실행되었습니다.');
      return (this.todolist.length === 0)? true : false  
    }
  },
  watch: {
    inputedDay(newValue, oldValue) {
      console.log('watch 실행되었습니다.');
      this.todolist.length = 0;
      (oldValue !== newValue)&&setTimeout(()=>this.axiosGet(), 2000);
    }
  },
  created() {
    // 고민
    setTimeout(()=>this.axiosGet(), 2000);
  },
  methods: {
    // Swiper func - onSwiper, onSlideChange
    onSwiper(swiper: any): void {
        console.log(swiper);
    },
    onSlideChange(): void {
        console.log('slide change');
    },
    showEditDeleteModal (boolean: boolean, item: object) :void {
      this.hasEditDeleteModal = boolean;
      this.todoItem = item
    },
    async axiosGet(): Promise<void> {
      console.log('axiosGet');
      console.log('this.todolist.length  '+ this.todolist.length);
      await axios
        .get(`http://localhost:3005/todolist?date=${this.inputedDay}`)
        .then((response) => {
          // handle success
          console.debug(response);
          this.todolist = response.data;
        })
        .catch((error): void => {
          // handle error
          console.debug(error);
        });
    },
    async axiosDelete(item: TodoItem): Promise<void> {
      await axios
        .delete(`http://localhost:3005/todolist/${item.id}`, {
          id: item.id,
          title: item.title,
          description: item.description,
          time: item.time
        })
        .then(response => {
          console.debug(response);
        })
        .catch(error => {
          console.debug(error);
        });
    },
    goEditTodoPage(todoItem: any): void {
      this.$router.push({ name: "EditTodo", params: todoItem });
    },
    goCalendarPage(): void {
      this.$router.push({ name: "Calendar" });
    },
    async deleteItem(item: TodoItem): Promise<void> {
      await this.axiosDelete(item);
      await this.axiosGet();
      this.hasEditDeleteModal = false;
    }
  }
});
</script>

<style scoped>
@import "./todolist.css";
</style>
