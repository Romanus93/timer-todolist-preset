<template>
  <div class="pocket-calendar-component">
    <v-date-picker 
      color="blue"
      locale="en-US"
      trim-weeks
      v-model="date"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'

export default defineComponent({
  name: 'TodoDate',
  props: {
    todoDate: {
      type: String as any
    }
  },
  data () {
    return {
      date: this.todoDate
    }
  },
  beforeUpdate () {
    this.changeDate();
  },
  methods: {
    changeDate (): void {
      (this.date === null)&&(this.date = this.todoDate)
      let changedDate: string = moment(this.date).format("YYYY-MM-DD");
      this.sendDate(changedDate);
    },
    sendDate (changedDate: string): void {
      this.$emit('checkDate',changedDate);
    }
  },
})
</script>

<style scoped>
@import "./todo-date.css"
</style>