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
          <li class="todo-flex item-modal-wrapper">
            <div class="todo-item todo-flex">
              <div>{{ item.title }}</div>
              <div>{{ item.description }}</div>
              <div class="todo-flex time-start-button-wrapper">
                <span>
                  {{ twoDigit(item.hours) }} &nbsp :
                </span>
                <span>
                  {{ twoDigit(item.minutes) }} &nbsp :
                </span>
                <span>
                  {{ twoDigit(item.seconds) }}
                </span>
                <span>
                  <button type="button" class="start-button" @click="goStartTodoPage(item)">
                    시작
                  </button>
                </span>
              </div>
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
    <!-- <div class="todo-item-none-modal todo-loading" v-show="loadingPage">
      <span><img class="rotate" src="/src/assets/and-so-on/loader.svg" alt=""></span>
    </div> -->
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
  date: string;
  title: string;
  description: string;
  hours: number;
  minutes: number;
  seconds: number;
  id: number;
}

declare module "axios" {
  interface AxiosRequestConfig {
    title: string;
    description: string;
    id: number;
    hours: number;
    minutes: number;
    seconds: number;
    date?: string;
  }
}

export default defineComponent({
  name: 'TodoList',
  props: {
    inputedDay: {
      type: [ Number, String ],
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
      loadingPage: true
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
      if(newValue == 0){
        return
      } else {
        this.todolist.length = 0;
        (oldValue !== newValue)&&setTimeout(()=>this.axiosGet(), 1000);  
      }
    }
  },
  created() {
    console.log('this.todolist.length',this.todolist.length);
    // 고민
    setTimeout(()=>this.axiosGet(), 1000);
  },
  methods: {
    // Swiper func - onSwiper, onSlideChange
    onSwiper(swiper: any): void {
        console.log(swiper);
    },
    onSlideChange(): void {
        console.log('slide change');
    },
    showEditDeleteModal (boolean: boolean, item: TodoItem) :void {
      this.hasEditDeleteModal = boolean;
      this.todoItem = item;
      console.log(this.todoItem);
    },
    twoDigit(param:number): string {
      console.log('two Digit', param);
      return ((param < 10 ? '0' : '') + param); 
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
        .delete(`http://localhost:3005/todolist/${item.id}`)
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
    goStartTodoPage(todoItem: any): void {
      console.log('a');
      console.log(todoItem);
      console.log(typeof todoItem.hours, typeof todoItem.minutes, typeof todoItem.seconds);
      this.$router.push({ name: "StartTodo", params: todoItem });
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
