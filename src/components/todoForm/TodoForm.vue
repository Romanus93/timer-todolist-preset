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
      <li class="todo-time">
        <label for="time">Time</label>
        <input
          type="number"
          id="time"
          name="time"
          v-model.number="time"
        />
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
      time: 0,
    }
  },
  created () {
    if(this.item){
      this.date = this.item.date;
      this.title = this.item.title;
      this.description = this.item.description;
      this.time = this.item.time;
    };
  },
  methods: {
    async createUpdateTodoItem() {
      let params = {
        date: this.date,
        title: this.title,
        description: this.description,
        time: this.time
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