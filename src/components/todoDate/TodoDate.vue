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
      type: Date
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
  computed: {
    calendarComputed: {
      get(): any {
        return this.todoDate
      },
      set(newValue: any): any {
        (newValue == null)&&(this.todoDate = this.date)
      }
    }
    // caseNull() {
    //   console.log('caseNull', this.todoDate);
    //   (this.todoDate == null)&&(this.todoDate=this.date);
    //   console.log('caseNull', this.todoDate);
    // }
  },
  methods: {
    async focusDatey(date:any): Promise<void> {
      console.log('focusDate');
      console.log(typeof date);
      console.log(this.date);
    //   calendar(): any {
    //   // const calendars = this.$refs.calendar as object;
    //   return this.$refs.calendar;
    // }
      const calendar: any = this.$refs.calendar;
      console.log(calendar);
      await calendar.focusDate(this.date);
      // await calendar.move(this.date);
      console.log('a');
    }
  },
  beforeCreate () {
    console.log('TodoDate-beforeCreated');
    console.log(this.date);
  },
  created () {
    console.log('TodoDate-created');
    console.log(this.date);
    console.log(this.todoDate);
  },
  beforeMount () {
    console.log('TodoDate-beforeMount');
    console.log(this.date);
    console.log(this.todoDate);
  },
  mounted() {
    console.log('TodoDate-mounted');
    console.log(this.date);
    console.log(this.todoDate);
  },
  beforeUpdate() {
    console.log('TodoDate-beforeUpdate');
    console.log('this date',this.date);
    console.log('this todoDATE',this.todoDate);
    console.log('attrs[0]',this.attrs[0].dates);
    if(this.todoDate == null){
      this.todoDate = this.date, this.attrs[0].dates=this.todoDate,console.log('!?!')
    } else {
      this.attrs[0].dates= null,console.log('?')
    }
    // (this.todoDate == null)&&(this.todoDate = this.date, this.attrs[0].dates=this.todoDate,console.log('!?!'));
    // (this.todoDate != null)&&(this.attrs[0].dates= null,console.log('?'));
    console.log('this todoDATE',this.todoDate);
    console.log('attrs[0]',this.attrs[0].dates);
    // console.error(this.attrs[0].dates);
    // if(this.todoDate == null){
    //     console.error('error-null인경우');
    //     this.todoDate=this.date
    //     this.attrs[0].dates = this.todoDate;
    //     console.error(this.attrs[0].dates);
    //     // return this.todoDate;
    //   } else {
    //     console.error('error-null 아닌 경우');
    //     this.attrs[0].dates = null;
    //     console.error(this.attrs[0].dates);
    //   }
  },
  updated() {
    console.log('TodoDate-updated');
    console.log(this.date);
  },
})
</script>

<style scoped>
@import "./todo-date.css"
</style>