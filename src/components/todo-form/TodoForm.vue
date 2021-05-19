<template>
  <section class="todo-flex todo-form-component">
    <!--Background Image Source <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
    <ul class="todo-flex todo-info todo-info--bg-image">
      <li class="todo-date">
        <span> {{ date }} </span>
        <button class="change-date-button button--pocket-calendar" type="button" @click="showPocketCalendar(true)" v-show="!showingPocketCalendar"> <i class="far fa-edit"></i> </button>
        <button class="check-date-button button--pocket-calendar" type="button" @click="showPocketCalendar(false)" v-show="showingPocketCalendar"> <i class="far fa-check-circle"></i>  </button>
        <todo-date
        :todoDate="date"
        show="showingPocketCalendar"
        @checkDate="checkDate"
        @showPocketCalendar="showPocketCalendar"
        v-show="showingPocketCalendar"
        />
      </li>
      <li class="todo-title">
        <label for="title">오늘 할 일</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder=" ?"
          v-model.trim="title"
          maxlength="30"
        />
      </li>
      <li class="todo-description">
        <label for="description">할 일 내용</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder=" ?"
          v-model.trim="description"
          maxlength="30"
        />
      </li>
      <li class="todo-flex todo-time">
        <div class="time-wrap">
          <label for="hours">시간</label>
          <input type="number" id="hour" class="time-hms" placeholder="0" min="0" v-model.number="hours" oninput="this.value = Math.abs(this.value)" />
        </div>
        <div class="time-separator">
          :
        </div>
        <div class="time-wrap">
          <label for="minutes">분</label>
          <input type="number" id="minutes" class="time-hms" placeholder="0" min="0" v-model.number="minutes" oninput="this.value = Math.abs(this.value)"/>
        </div>
        <div class="time-separator">
          :
        </div>  
        <div class="time-wrap">
          <label for="seconds">초</label>
          <input type="number" id="seconds" class="time-hms" placeholder="0" min="0" v-model.number="seconds" oninput="this.value = Math.abs(this.value)" />
        </div>
      </li>
    </ul>
    <ul class="todo-flex create-edit-buttons-wrap">
      <li>
        <button class="create-edit-button button--calendar button--calendar-image" @click="createUpdateTodo">
          <i class="fas fa-pencil-alt"></i>
        </button>
      </li>
      <li>
        <button class="home-button button--calendar button--calendar-image" @click="goCalendar()">
          <i class="fas fa-home"></i>
        </button>
      </li>
    </ul>
    <div class="check-modal todo-flex" v-show="showingWarning">
      <div class="check-modal__text">
        <p>시간을 입력해주세요.</p>
        <button @click="showingWarning = false"><i class="fas fa-times"></i> 닫기</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import axios from 'axios'
import moment from 'moment'
import { defineComponent } from 'vue'
import TodoDate from '/src/components/todo-Date/TodoDate.vue'

interface ParamsTodo {
  date: string;
  title: string;
  description: string;
  hours: number;
  minutes: number;
  seconds: number;
}

export default defineComponent({
  name: 'TodoForm',
  components: {
    TodoDate
  },
  props: {
    todo: {
      type: Object as any
    }
  },
  data () {
    return {
      date: '',
      title: '',
      description: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
      showingPocketCalendar: false,
      showingWarning: false,
    }
  },
  created () {
    if(this.todo.type === 'create'){
      this.date = this.todo.date;
    } else {
      console.log('this.todo.type === edit',this.todo.type);
      this.date = this.todo.date;
      this.title = this.todo.title;
      this.description = this.todo.description;
      this.hours = this.todo.hours;
      this.minutes = this.todo.minutes;
      this.seconds = this.todo.seconds;
    };
  },
  beforeUpdate () {
    this.hrs();
    this.min();
    this.sec();
  },
  methods: {
    hrs (): void {
      if(this.hours >= 100) {
        this.hours = 0;
      } else {
        this.hours = Math.floor(this.hours);
      }
    },
    min (): void {
      if(this.minutes >= 60) {
        this.minutes = 0;
      } else {
        this.minutes = Math.floor(this.minutes);
      }
    },
    sec (): void {
      if(this.seconds >= 60) {
        this.seconds = 0;
      } else {
        this.seconds = Math.floor(this.seconds);
      }
    },
    goCalendar (): void {
      sessionStorage.removeItem('todo');
      let today: string = moment(new Date()).format("YYYY-MM-DD");
      (today == this.date )? this.$router.push({name: "Calendar" }) : this.$router.push({name: "Calendar", params: {todoDate: this.date} });
    },
    showPocketCalendar (param: boolean): void {
      this.showingPocketCalendar = param;
    },
    checkDate (changedDate: string): void {
      this.date = changedDate;
    },
    createUpdateTodo () : void {
      let totalTime: number = this.hours + this.minutes + this.seconds;
      if(totalTime === 0 ){
        this.showingWarning = true;
        return
      } else {
        this.postOrPut();
      }
    },
    postOrPut() : void {
      let params: ParamsTodo = {
        date: this.date,
        title: this.title,
        description: this.description,
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds
      };
      if(this.todo.type === 'edit') {
        this.axiosPut(params);
      } else {
        this.axiosPost(params);
      }
    },
    async axiosPut(params: ParamsTodo ): Promise<void> {
      const res = await axios
          .put("http://localhost:3005/todolist/"+this.todo.id, params)
          .then(response => {
            console.debug(response.data);
            this.goCalendar();
          })
          .catch(error => {
            console.debug(error);
          });
    },
    async axiosPost(params: ParamsTodo ): Promise<void> {
      const res = await axios
          .post("http://localhost:3005/todolist", params)
          .then(response => {
            console.debug(response.data);
            this.goCalendar();
          })
          .catch(error => {
            console.debug(error);
          });
    }
  }
})
</script>

<style scoped>
@import "./todo-form.css"
</style>