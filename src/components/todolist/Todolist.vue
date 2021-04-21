<template>
  <div class="todolist-component">
    <!-- 일정 목록 -->
    <main>
      <section class="todo-flex temporaryClass">
        <!-- v-for 반복문 -->
        <ul class="todo-lists" v-show="getDay">
          <swiper
            :slides-per-view="1"
            :space-between="50"
            :pagination="{ clickable: false }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
          >
            <swiper-slide v-for="(item, index) in todolist" :key="index">
              <li class="todo_item todo-flex">
                <div>Title : {{ item.title }}</div>
                <div>description : {{ item.description }}</div>
                <div>time : {{ item.time }}</div>
                <!-- eslint-disable-next-line -->
                <div>
                  <button type="button" class="button--start">
                    <i class="fas fa-running"></i>
                  </button>
                </div>
                <!-- eslint-disable-next-line -->
                <div class="button--edit-delete-wrapper">
                  <button type="button" class="button--edit-delete" @click="openUDCModal(true)">
                    <i class="fas fa-ellipsis-h"></i>
                  </button>
                </div>
                <!-- eslint-disable-next-line -->
                <div class="todo-flex modal" v-show="isVisibleUDCModal" >
                  <ul>
                    <li style="color: red;">
                      <button type="button" class="button--delete" style="width: 10vw" @click="deleteTodolist(item)">삭제하기</button>
                    </li>
                    <li>
                      <button type="button" class="button--edit" @click="goEditTodoPage(item)">수정하기</button>
                    </li>
                    <li>
                      <button type="button" class="button--cancle" @click="openUDCModal(false)">취소</button>
                    </li>
                  </ul>
                </div>
              </li>
            </swiper-slide>
          </swiper>
        </ul>
        <div class="noTodoItemModal" v-show="!getDay || isVisibleTodoItemModal">
          <img src="src\assets\nothing to do.jpg" alt="뚱이 사진">
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import moment from "moment";
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

interface Todolist {
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
    date: {
      type: Object,
      required: true
    },
    getDay: {
      type: String,
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
      isVisibleUDCModal: false
    }
  },
  computed: {
    dateOfTodoItem(): string {
      return this.getDay;
    },
    isVisibleTodoItemModal(): boolean {
      return this.todolist.length === 0 ? true: false
    }
  },
  watch: {
    // else 써야하나 아니면 if문 속에 if문을 넣어야 할려나
    getDay(newValue, oldValue) {
      if(newValue == null) {
        this.todolist.length = 0;
      } else if ((newValue !== null)&&(oldValue !== newValue)) {
        this.axiosGet();
      } else {
        console.debug('else');
      }
    }
  },
  // this.todolist가 먼저 나오는데 async를 써주는 것이 맞는지.
  async created(): Promise<void> {
    await this.axiosGet();
  },
  methods: {
    // Swiper func - onSwiper, onSlideChange
    onSwiper(swiper: any): void {
        console.log(swiper);
    },
    onSlideChange(): void {
        console.log('slide change');
    },
    openUDCModal (booleanParams: boolean) :void {
      this.isVisibleUDCModal = booleanParams;
    },
    async axiosGet(): Promise<void> {
      console.debug('axios-get');
      this.todolist.length = 0;
      await axios
        .get(`http://localhost:3005/todolists?date=${this.dateOfTodoItem}`)
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
    async axiosDelete(item: Todolist): Promise<void> {
      await axios
        .delete(`http://localhost:3005/todolists/${item.id}`, {
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
    goEditTodoPage(item: any): void {
      this.$router.push({ name: "EditTodo", params: item });
    },
    goCalendarPage(): void {
      this.$router.push({ name: "Calendar" });
    },
    async deleteTodolist(item: Todolist): Promise<void> {
      await this.axiosDelete(item);
      await this.axiosGet();
      this.isVisibleUDCModal = false;
    }
  }
});
</script>

<style scoped>
@import "./todolist.css";
</style>
