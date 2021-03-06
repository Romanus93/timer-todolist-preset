<template>
  <ul class="todo-list">
    <swiper
      :slides-per-view="1"
      :space-between="50"
      :pagination="{ clickable: true }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="(item, index) in todolist" :key="index">
        <li class="todo-flex todo-item-wrap">
          <div class="todo-item todo-flex">
            <div>{{ item.title }}</div>
            <div>{{ item.description }}</div>
            <div class="todo-flex time-start-button-wrap">
              <span class="time">
                <span>
                  {{ twoDigit(item.hours) }} :
                </span>
                <span>
                  {{ twoDigit(item.minutes) }} :
                </span>
                <span>
                  {{ twoDigit(item.seconds) }}
                </span>
              </span>
              <span class="start-button-wrap">
                <button type="button" class="start-button" @click="goStartTodo(item)">
                  시작
                </button>
              </span>
            </div>
          </div>
          <div class="edit-delete-modal-button-wrap">
            <button type="button" class="edit-delete-modal-button" @click="showEditDeleteModal(true, item)">
              <i class="fas fa-ellipsis-h"></i>
            </button>
          </div>
        </li>
      </swiper-slide>
    </swiper>
    <div class="edit-delete-buttons-modal" v-show="editDeleteModal" >
      <ul class="todo-flex">
        <li>
          <button type="button" class="delete-button button--modal" @click="goDeleteTodo(todo)">
            <i class="fas fa-trash-alt"></i> 삭제하기
          </button>
        </li>
        <li>
          <button type="button" class="edit-button button--modal"  @click="goEditTodo(todo)">
            <i class="far fa-edit"></i> 수정하기
          </button>
        </li>
        <li>
          <button type="button" class="cancle-button button--modal" @click="editDeleteModal = false">
            <i class="fas fa-times"></i> 취소
          </button>
        </li>
      </ul>
    </div>
  </ul>
  <div class="none-todo-item-modal none-todo-item-image" v-show="nothingTodoModal">
  </div>
  <div class="none-todo-item-modal todo-loading todo-flex " v-show="loadingModal">
    <img class="rotate" src="/src/assets/and-so-on/loader.svg" alt="loader">
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// import Swiper core and required modules
import SwiperCore, { Pagination, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

 // install Swiper modules
SwiperCore.use([Pagination, A11y]);

interface Todo {
  date: string;
  title: string;
  description: string;
  hours: number;
  minutes: number;
  seconds: number;
  id: number;
}

export default defineComponent({
  name: 'TodoList',
  props: {
    inputtedDate: {
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
      todolist: [] as Array<Todo>,
      editDeleteModal: false,
      todo: {
        date: '',
        title: '',
        description: '',
        hours: 0,
        minutes: 0,
        seconds: 0,
        id: 0
      } as Todo,
      loadingModal: true,
      nothingTodoModal: false
    }
  },
  watch: {
    inputtedDate(newValue, oldValue) {
      if(newValue == 0){
        return
      } else {
        (oldValue !== newValue)&&this.axiosGet();
      }
    }
  },
  created () {
    setTimeout(()=>this.axiosGet(), 500);
  },
  methods: {
    // Swiper function - onSwiper, onSlideChange
    onSwiper(swiper: any): void {
        console.log(swiper);
    },
    onSlideChange(): void {
        console.log('slide change');
    },
    showEditDeleteModal (boolean: boolean, item: any) :void {
      this.editDeleteModal = boolean;
      this.todo = item;
    },
    twoDigit(param:number): string {
      return ((param < 10 ? '0' : '') + param); 
    },
    showNothingTodoModal(param: object[] ) {
      this.loadingModal = false;
      this.nothingTodoModal = (param.length === 0)? true : false;
    },
    async axiosGet(): Promise<void> {
      const res = await axios
        .get(`http://localhost:3005/todolist?date=${this.inputtedDate}`)
        .then((response) => {
          // handle success
          console.debug(response);
          this.todolist = response.data;
        })
        .catch((error): void => {
          // handle error
          console.debug(error);
        });
      this.showNothingTodoModal(this.todolist);  
    },
    async axiosDelete(todo: Todo): Promise<void> {
      const res = await axios
        .delete(`http://localhost:3005/todolist/${todo.id}`)
        .then(response => {
          console.debug(response);
        })
        .catch(error => {
          console.debug(error);
        });
    },
    goEditTodo(todo: any): void {
      todo.type = 'edit'
      todo.path= 'edit-todo'
      this.$router.push({ name: "CreateEditTodo", params: todo });
    },
    goStartTodo(todo: any): void {
      this.$router.push({ name: "StartTodo", params: todo });
    },
    async goDeleteTodo(todo: Todo): Promise<void> {
      await this.axiosDelete(todo);
      await this.axiosGet();
      this.editDeleteModal = false;
    }
  }
});
</script>

<style scoped>
@import "./todolist.css";
</style>