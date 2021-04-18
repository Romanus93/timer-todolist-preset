<template>
  <div class="todolist-component">
    <header class="header">
      <!-- 년-월-주일 달력이동 / 어제-내일 날짜 이동 메뉴버튼 -->
      <ul class="todo-flex nav">
        <li>
          <button class="button--calendars">
            <i class="far fa-calendar-alt"></i>
          </button>
        </li>
        <li>
          <button class="button--yesterday" @click="goYesterday">
            <i class="fas fa-chevron-left"></i>
          </button>
        </li>
        <li class="today">
          <!-- 여기 값은 월 달력에서 해당 일(day)를 클릭했을때, 해당 day에 대한 값을 받아서, <h1>이 사이에 값이 들어감</h1> -->
          <h1>{{ getDay }}</h1>
          <!-- <h1>{{ date}}</h1> -->
        </li>
        <li>
          <button class="button--tomorrow" @click="goTomorrow">
            <i class="fas fa-chevron-right"></i>
          </button>
        </li>
        <li>
          <button class="button--menus">
            <i class="fas fa-bars"></i>
          </button>
        </li>
      </ul>
      <!-- 일정 생성 삭제 버튼 html 바까야함.div로 -->
      <ul class="todo-flex buttons-wrapper">
        <li>
          <button class="button--create" @click="goCreateTodoPage">
            <i class="fas fa-plus"></i>
          </button>
        </li>
      </ul>
    </header>
    <!-- 일정 목록 -->
    <main>
      <section class="todo-flex temporaryClass">
        <!-- v-for 반복문 -->
        <ul class="todo-lists" v-show="!modalText">
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
                  <button type="button" class="button--edit-delete" @click="openModal(true)">
                    <i class="fas fa-ellipsis-h"></i>
                  </button>
                </div>
                <!-- eslint-disable-next-line -->
                <div class="todo-flex modal" v-show="modalBoolean" >
                  <ul>
                    <li style="color: red;">
                      <button type="button" class="button--delete" style="width: 10vw" @click="deleteTodolist(item)">삭제하기</button>
                    </li>
                    <li>
                      <button type="button" class="button--edit" @click="goEditTodoPage(item)">수정하기</button>
                    </li>
                    <li>
                      <button type="button" class="button--cancle" @click="openModal(false)">취소</button>
                    </li>
                  </ul>
                </div>
              </li>
            </swiper-slide>
          </swiper>
        </ul>
        <div class="modalText" v-show="modalText">
          {{ modalText }}
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
  name: 'Todolist',
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
  emits: ["goYesterday", "goTomorrow"],
  components: {
      Swiper,
      SwiperSlide,
    },
  data() {
    return {
      todolist: [] as object[],
      modalText: '',
      modalBoolean: false
    }
  },
  computed: {
    todolistDate(): string {
      return this.getDay;
    }
  },
  watch: {
    // else 써야하나 아니면 if문 속에 if문을 넣어야 할려나
    getDay(newValue, oldValue) {
      if(newValue == null) {
        this.todolist.length = 0;
        this.inputText();
      } else if ((newValue !== null)&&(oldValue !== newValue)) {
        console.debug('else if');
        this.axiosGet();
      } else {
        console.debug('else');
      }
    }
  },
  // this.todolist가 먼저 나오는데 async를 써주는 것이 맞는지.
  created(): void {
    this.axiosGet();
    console.log(this.todolist);
  },
  methods: {
    // Swiper func - onSwiper, onSlideChange
    onSwiper(swiper: any): void {
        console.log(swiper);
    },
    onSlideChange(): void {
        console.log('slide change');
    },
    openModal (booleanParams: boolean) :void {
      console.log(booleanParams);
      this.modalBoolean = booleanParams;
    },
    async axiosGet(): Promise<void> {
      this.todolist.length = 0;
      await axios
        .get("http://localhost:3005/todolists")
        .then((response) => {
          // handle success
          console.debug('a');
          response.data.forEach((element: Todolist): void => {
            (element.date == this.todolistDate)&& this.todolist.push(element)
          });
          console.debug('axiosGet-',this.todolist.length)
        })
        .catch((error): void => {
          // handle error
          console.debug(error);
        });
      this.inputText();
      console.debug('b');
    },
    async axiosDelete(item: Todolist): Promise<void> {
      console.debug('axios-delete -- b');
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
      console.debug('axios-delete -- c');
    },
    goYesterday(): void {
      console.log("goYesterday");
      // eslint-disable-next-line
      const startOfMonth : string = moment(this.date).startOf('month').format('YYYY-MM-DD');
      // eslint-disable-next-line
      (this.todolistDate == startOfMonth ) ? this.$emit("goYesterday", -1) : this.$emit("goYesterday", 0);
    },
    goTomorrow(): void {
      // eslint-disable-next-line
      const endOfMonth : string = moment(this.date).endOf("month").format("YYYY-MM-DD");
      // eslint-disable-next-line
      (this.todolistDate == endOfMonth ) ? this.$emit("goTomorrow", 1) : this.$emit("goTomorrow", 0);
    },
    goCreateTodoPage(): void {
      this.$router.push({ name: "CreateTodo" , params: { todolistDate: this.todolistDate }});
    },
    goEditTodoPage(item: any): void {
      this.$router.push({ name: "EditTodo", params: item });
    },
    goCalendarPage(): void {
      this.$router.push({ name: "Calendar" });
    },
    async deleteTodolist(item: Todolist): Promise<void> {
      console.debug('axios-delete -- a');
      await this.axiosDelete(item);
      console.debug('axios-delte -- d');
      await this.axiosGet();
      this.modalBoolean = false;
    },
    inputText(): void {
      if (this.todolist.length == 0) {
        this.modalText = "😋오늘은 뭘 할까요❔";
      } else {
        this.modalText = "";
      }
    }
  }
});
</script>

<style scoped>
@import "./todolist.css";
</style>
