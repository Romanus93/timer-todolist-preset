<template>
  <div class="todo-flex todo-form-wrapper">
    <!--Background Image Source <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
    <ul class="todo-flex todo-info todo-info--bg-image">
      <li class="todo-date">
        <span> {{ date }} </span>
        <button type="button" @click="showPocketCalendar(true)"> 변경 </button>
        <button type="button" @click="showPocketCalendar(false)"> 선택 </button>
        <todo-date
        :dateOfTodoItem="dateOfTodoItem"
        show="show"
        @checkDate="checkDate"
        @showPocketCalendar="showPocketCalendar"
        v-if="show"
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
      <li class="todo-time todo-flex">
        <span class="time-wrapper todo-flex">
          <label for="hours">시간</label>
          <span>
            <input id="hour" class="time-hms" type="number" placeholder="0" min="0" v-model.number="hours" oninput="this.value = Math.abs(this.value)" />&nbsp:
          </span>
        </span>
        <span class="time-wrapper todo-flex">
          <label for="minutes">&nbsp분</label>
          <span>
            <input id="minutes" class="time-hms" type="number" placeholder="0" min="0" v-model.number="minutes" oninput="this.value = Math.abs(this.value)" />&nbsp:
          </span>
        </span>
        <span class="time-wrapper todo-flex">
          <label for="seconds">&nbsp초</label>
          <input id="seconds" class="time-hms" type="number" placeholder="0" min="0" v-model.number="seconds" oninput="this.value = Math.abs(this.value)" />
        </span>
      </li>
    </ul>
    <ul class="todo-flex buttons-wrapper">
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
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import moment from 'moment'
import { defineComponent, ref } from 'vue'
import TodoDate from '../../components/todoDate/TodoDate.vue'

export default defineComponent({
  name: 'TodoForm',
  components: {
    TodoDate
  },
  props: {
    type: {
      type: String,
      required: true
    },
    dateOfTodoItem: {
      type: String,
      default: ''
      // dateOfTodoItem type 에러 해결값.
    },
    item: {
      type: Object
    }
  },
  data() {
    return {
      date: this.dateOfTodoItem,
      title: '',
      description: '',
      hours: 0 as any,
      minutes: 0 as any,
      seconds: 0 as any,
      show: false
    }
  },
  created () {
    console.log('todoform-created');
    console.log(this.dateOfTodoItem);
    if(this.item){
      this.date = this.item.date;
      this.title = this.item.title;
      this.description = this.item.description;
      this.hours = this.item.hours;
      this.minutes = this.item.minutes;
      this.seconds = this.item.seconds;
    };
  },
  mounted () {
    console.log('aaaaa');
  },
  beforeUpdate () {
    console.log('beforeUpdate');
    this.hrs();
    this.min();
    this.sec();
  },
  methods: {
    async createUpdateTodoItem() {
      let params = {
        date: this.date,
        title: this.title,
        description: this.description,
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds
      };

      let totalTime: number = this.hours + this.minutes + this.seconds;
      if(totalTime === 0){
        alert('0');
        return
      };
      // (totalTime === 0)&&(alert('0'));
      console.log('0이 아님');
      if(this.type === 'edit' && this.item ) {
        const res = await axios
        .put("http://localhost:3005/todolist/"+this.item.id, params)
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
    },
    hrs(): any {
      console.log('hrs');
      (this.hours === '')&&(this.hours = 0);
      this.hours = Math.floor(this.hours);
      return Math.floor(this.hours)
    },
    min(): any {
      console.log('min');
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
      console.log('sec');
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
      this.show = param;
      console.log('abcdefghrty');
    },
    checkDate(changedDate: any) {
      console.log(changedDate);
      this.date = changedDate;
      console.log(this.date);
    }
    
  }
})
</script>

<style scoped>
@import "./todo-form.css"
</style>