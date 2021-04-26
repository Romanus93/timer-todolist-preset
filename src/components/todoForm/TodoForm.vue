<template>
  <div class="todo-flex todo-form">
    <!--Background Image Source <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
    <ul class="todo-flex todo-info todo-info--bg-image">
      <li class="todo-title">
        <label for="title">오늘 할 일</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="?"
          v-model.trim="title"
        />
      </li>
      <li class="todo-description">
        <label for="description">할 일 내용</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="?"
          v-model.trim="description"
        />
      </li>
      <li class="todo-time todo-flex">
        <span class="time-wrapper todo-flex">
          <label class="time-hms" for="hours">시간</label>
          <span>
            <input id="hour" class="time-hms" type="number" placeholder="00" min="0" v-model.number="hours" oninput="this.value = Math.abs(this.value)" /> :
          </span>
        </span>
        <span class="time-wrapper todo-flex">
          <label class="time-hms" for="minutes">&nbsp분</label>
          <span>
            <input id="minutes" class="time-hms" type="number" placeholder="00" min="0" v-model.number="minutes" oninput="this.value = Math.abs(this.value)" /> :
          </span>
        </span>
        <span class="time-wrapper todo-flex">
          <label class="time-hms" for="seconds">&nbsp초</label>
          <input id="seconds" class="time-hms" type="number" placeholder="00" min="0" v-model.number="seconds" oninput="this.value = Math.abs(this.value)" />
        </span>
      </li>
    </ul>
    <ul class="todo-flex buttons-wrapper">
      <li>
        <button class="create-edit-button button--calendr button--calendar-image" @click="createUpdateTodoItem">
          <i class="fas fa-pencil-alt"></i>
        </button>
      </li>
      <li>
        <button class="home-button button--calendr button--calendar-image" @click="goCalendarPage">
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

export default defineComponent({
  name: 'TodoForm',
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
      hours: '' as any,
      minutes: '' as any,
      seconds: '' as any,
      time: {} as object,
    }
  },
  created () {
    if(this.item){
      this.date = this.item.date;
      this.title = this.item.title;
      this.description = this.item.description;
      this.hours = this.item.time.hours;
      this.minutes = this.item.time.seconds;
      this.seconds = this.item.time.minutes;
    };
    console.log(this.seconds);
    
  },
  mounted () {
    console.log('aaaaa');
  },
  beforeUpdate () {
    console.log('beforeUpdate');
    (this.hours.length != 0) && this.hrs();
    (this.minutes.length != 0) && this.min();
    (this.seconds.length != 0) && this.sec();
  },
  methods: {
    async createUpdateTodoItem() {
      let params = {
        date: this.date,
        title: this.title,
        description: this.description,
        time: {
          hours: this.hours,
          minutes: this.minutes,
          seconds: this.seconds
        }
      }
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
          //this.$router.push({ name: "Calendar" });
        })
        .catch(error => {
          console.debug(error);
        });
      }
    },
    hrs(): any {
      this.hours = Math.floor(this.hours);
      return Math.floor(this.hours)
    },
    min(): any {
      if(this.minutes >= 60) {
        console.log('if-m');
        this.minutes = 0;
        return this.minutes
      } else {
        console.log('if-else-m');
        this.minutes = Math.floor(this.minutes);
        return Math.floor(this.minutes)
      }
    },
    sec(): any {
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
    }
  }
})
</script>

<style scoped>
@import "./todo-form.css"
</style>