<template>
  <div class="xpenfl">
    <v-date-picker 
      :attributes="attrs"
      ref="calendar"
      color="blue"
      locale="en-US"
      trim-weeks
      v-model="todoDate"
    />
    <!-- <h2>{{ calendarComputed }}</h2> -->
    <h3>{{ todoDate }}</h3>
  </div>
  <button @click="focusDatey(todoDate)">Lorem ipsum dolor sit.</button>
  <button @click="focusDatey(todoDate)">Lorem ipsum dolor sit.</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    date: {
      type: Date as any
    },
  },
  data() {
    return {
      todoDate: this.date as any,
      attrs: [
        {
          highlight: true,
          dates: null
        }
      ]
    }
  },
  // computed: {
  //   calendarComputed: {
  //     get(): any {
  //       return this.todoDate
  //     },
  //     set(newValue: any): any {
  //       (newValue == null)&&(this.todoDate = this.date)
  //     }
  //   }
  // },
  methods: {
    focusDatey(): void {
      console.log('focusDate');
      const calendar: any = this.$refs.calendar;
      calendar.focusDate(this.date);
      console.log('a');
    }
  },
  beforeUpdate() {
    console.log('TodoDate-beforeUpdate');
    console.log('this date',this.date);
    console.log('this todoDATE',this.todoDate);
    console.log('attrs[0]',this.attrs[0].dates);
    if(this.todoDate == null){
      // this.todoDate = this.date;
      this.attrs[0].dates=this.date;
      this.focusDatey();
      console.log('!?!')
    } else {
      this.attrs[0].dates= null;
        console.log('?');
    }
  },
  updated() {
    console.log('TodoDate-updated');
    console.log(this.date);
    console.log(this.todoDate);
    
  },
})
</script>

<style scoped>
@import "./todo-date.css"
</style>