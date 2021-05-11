<template>
  <section class="todo-flex todo-form-component">
    <!--Background Image Source <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
    <ul class="todo-flex todo-info todo-info--bg-image">
      <li class="todo-date">
        <span> {{ date }} </span>
        <button class="change-date-button button--pocket-calendar" type="button" @click="showPocketCalendar(true)" v-show="!showingPCalendar"> <i class="far fa-edit"></i> </button>
        <button class="check-date-button button--pocket-calendar" type="button" @click="showPocketCalendar(false)" v-show="showingPCalendar"> <i class="far fa-check-circle"></i>  </button>
        <todo-date
        :dateOfTodoItem="date"
        show="showingPCalendar"
        @checkDate="checkDate"
        @showPocketCalendar="showPocketCalendar"
        v-if="showingPCalendar"
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
        />
      </li>
      <li class="todo-flex todo-time">
        <div class="time-wrap">
          <label for="hours">시간</label>
          <span>
            <input id="hour" class="time-hms" placeholder="0" min="0" v-model.number="hours" oninput="this.value = Math.abs(this.value)" />&nbsp:&nbsp
          </span>
        </div>
        <div class="time-wrap">
          <label for="minutes">&nbsp분</label>
          <span>
            <input id="minutes" class="time-hms" placeholder="0" min="0" v-model.number="minutes" oninput="this.value = Math.abs(this.value)" />&nbsp:&nbsp
          </span>
        </div>
        <div class="time-wrap">
          <label for="seconds">&nbsp초</label>
          <input id="seconds" class="time-hms" placeholder="0" min="0" v-model.number="seconds" oninput="this.value = Math.abs(this.value)" />
        </div>
      </li>
    </ul>
    <ul class="todo-flex create-edit-buttons-wrap">
      <li>
        <button class="create-edit-button button--calendar button--calendar-image" @click="createUpdateTodoItem">
          <i class="fas fa-pencil-alt"></i>
        </button>
      </li>
      <li>
        <button class="home-button button--calendar button--calendar-image" @click="goCalendarPage">
          <i class="fas fa-home"></i>
        </button>
      </li>
    </ul>
    <div class="check-modal todo-flex" v-show="showingWarning">
      <div class="check-modal__text">
        <p>값을 확인해주세요.</p>
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

export default defineComponent({
  name: 'TodoForm',
  components: {
    TodoDate
  },
  props: {
    todoitem: {
      type: Object as any
    }
  },
  data() {
    return {
      date: '',
      title: '',
      description: '',
      hours: 0 as any,
      minutes: 0 as any,
      seconds: 0 as any,
      showingPCalendar: false,
      showingWarning: false,
    }
  },
  beforeCreate(){
    console.log('todoForm--beforeCreated');
  },
  created () {
    console.log('todoForm--created');
    if(this.todoitem.type === 'create'){
      this.date = this.todoitem.date;
    } else {
      this.date = this.todoitem.date;
      this.title = this.todoitem.title;
      this.description = this.todoitem.description;
      this.hours = this.todoitem.hours;
      this.minutes = this.todoitem.minutes;
      this.seconds = this.todoitem.seconds;
    };
  },
  beforeMount() {
    console.log('todoForm--beforeMount');
  },
  mounted() {
    console.log('todoForm--mounted');
  },
  beforeUpdate () {
    this.hrs();
    this.min();
    this.sec();
  },
  methods: {
    async createUpdateTodoItem() {
      let totalTime: number = this.hours + this.minutes + this.seconds;
      if(this.title === '' || this.description === '' || totalTime === 0 ){
        this.showingWarning = true;
        return
      } else {
          let params = {
          date: this.date,
          title: this.title,
          description: this.description,
          hours: this.hours,
          minutes: this.minutes,
          seconds: this.seconds
        };
        // if(this.todoitem.type === 'edit' && this.todoitem ) {
        if(this.todoitem.type === 'edit') {
          const res = await axios
          .put("http://localhost:3005/todolist/"+this.todoitem.id, params)
          .then(response => {
            console.debug(response.data);
            this.goCalendarPage();
          })
          .catch(error => {
            console.debug(error);
          });
        } else {
          const res = await axios
          .post("http://localhost:3005/todolist", params)
          .then(response => {
            console.debug(response.data);
            this.goCalendarPage();
          })
          .catch(error => {
            console.debug(error);
          });
        }
      }
    },
    hrs(): any {
      if(this.hours >= 100 || this.hours === '') {
        this.hours = 0;
        return this.hours;
      } else {
        this.hours = Math.floor(this.hours);
        return Math.floor(this.hours);
      }
    },
    min(): any {
      (this.minutes === '')&&(this.minutes = 0);
      if(this.minutes >= 60) {
        this.minutes = 0;
        return this.minutes
      } else {
        this.minutes = Math.floor(this.minutes);
        return Math.floor(this.minutes)
      }
    },
    sec(): any {
      (this.seconds === '')&&(this.seconds = 0);
      if(this.seconds >= 60) {
        this.seconds = 0;
        return this.seconds
      } else {
        this.seconds = Math.floor(this.seconds)
        return Math.floor(this.seconds)
      }
    },
    goCalendarPage(): void {
      const today: string = moment(new Date()).format("YYYY-MM-DD");
      (today == this.date )? this.$router.push({name: "Calendar" }) : this.$router.push({name: "Calendar", params: {dateOfTodoItem: this.date} });
    },
    showPocketCalendar(param: boolean):void {
      this.showingPCalendar = param;
    },
    checkDate(changedDate: any) {
      this.date = changedDate;
    }
  }
})
</script>

<style scoped>
@import "./todo-form.css"
</style>