<template>
  <main class="todo-flex edit-form">
    <ul class="todo-flex todo-info">
      <li class="todo-flex todo-title">
        <label for="title">오늘 할 일</label>
        <input
          type="text"
          id="title"
          name="todo-title"
          v-model.trim="title"
        />
      </li>
      <li class="todo-flex todo-content">
        <label for="description">할 일 내용</label>
        <input
          type="text"
          id="description"
          name="todo-content"
          v-model.trim="description"
        />
      </li>
      <li>
        <label for="time">Time</label>
        <input
          type="number"
          id="time"
          name="todo-time"
          v-model.number="time"
        />
      </li>
    </ul>
    <ul class="todo-flex buttons-wrapper">
      <li>
        <button class="button--edit" @click="createUpdateTodoItem">
          <i class="far fa-edit"></i>
        </button>
      </li>
      <li>
        <button class="button--home" @click="goCalendarPage">
          <i class="fas fa-home"></i>
        </button>
      </li>
    </ul>
  </main>
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
    todoItemDate: {
      type: String,
      default: ''
      // todoItemDate type 에러 해결값.
    },
    item: {
      type: Object
    }
  },
  data() {
    return {
      date: this.todoItemDate,
      title: '',
      description: '',
      time: 0,
    }
  },
  created () {
    console.log('todoform');
    console.log(this.date);
    if(this.item){
      this.date = this.item.date;
      this.title = this.item.title;
      this.description = this.item.description;
      this.time = this.item.time;
    };
    console.log(this.title , this.description, this.time, this.date);
  },
  methods: {
    async createUpdateTodoItem() {
      console.log('createUpdateTodoItem');
      let params = {
        date: this.date,
        title: this.title,
        description: this.description,
        time: this.time
      }
      if(this.type === 'edit' && this.item ) {
        const res = await axios.put("http://localhost:3005/todolists/"+this.item.id, params)
        .then(response => {
          console.debug(response.data);
          this.goCalendarPage();
          //this.$router.push({ name: "Calendar" });
        })
        .catch(error => {
          console.debug(error);
        });
      } else {
        const res = await axios.post("http://localhost:3005/todolists", params)
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
      (today == this.date )? this.$router.push({name: "Calendar" }) : this.$router.push({name: "Calendar", params: {todoItemDate: this.date} });
    }
  }
})
</script>
