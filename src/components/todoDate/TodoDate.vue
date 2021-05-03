<template>
  <div class="calendar-wrapper todo-flex">
    <v-date-picker 
      color="blue"
      locale="en-US"
      trim-weeks
      v-model="date"
    />
    <div>
      <button></button>
    </div>
  </div>
    <h2>{{ changedDate }}</h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'

export default defineComponent({
  props: {
    dateOfTodoItem: {
      type: Date as any
    },
  },
  data() {
    return {
      date: this.dateOfTodoItem as any
    }
  },
  computed: {
    changedDate: {
      get(): string {
        return moment(this.date).format("YYYY-MM-DD");
      },
      set(newValue: any): void {
        (newValue == null)&&(this.date = this.dateOfTodoItem)
      }
    }
  },
  beforeUpdate() {
    console.log('date-beforeUpdate');
    console.log('this date',this.dateOfTodoItem);
    console.log('this date',this.date);
    (this.date == null)&&(this.date = this.dateOfTodoItem);
    console.log(this.calendarComputed)
  },
  updated() {
    console.log('date-updated');
    console.log(this.dateOfTodoItem );
    console.log(this.date);
  },
})
</script>

<style scoped>
@import "./todo-date.css"
</style>