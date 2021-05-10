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
    dateOfTodoItem: {
      type: String as any
    }
  },
  data() {
    return {
      date: this.dateOfTodoItem
    }
  },
  beforeUpdate() {
    this.changeDate();
  },
  methods: {
    sendDate(changedDate: string): void {
      this.$emit('checkDate',changedDate);
    },
    changeDate(): any {
      (this.date === null)&&(this.date = this.dateOfTodoItem)
      let changedDate = moment(this.date).format("YYYY-MM-DD")
      this.sendDate(changedDate);
    }
  },
})
</script>

<style scoped>
@import "./todo-date.css"
</style>