<template>
  <div class="pocket-calendar-wrapper">
    <v-date-picker 
      color="blue"
      locale="en-US"
      trim-weeks
      v-model="date"
    />
    <div class="change-button-wrapper">
      <button class="change-button" @click="changeDate">선택</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'

export default defineComponent({
  name: 'TodoDate',
  props: {
    dateOfTodoItem: {
      type: Date as any
    },
    show :{
      type: Boolean
    }
  },
  data() {
    return {
      date: this.dateOfTodoItem as any,
      isVisible: this.show
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
    (this.date == null)&&(this.date = this.dateOfTodoItem);
    console.log(this.changedDate)
  },
  updated() {
    console.log('date-updated');
    console.log(this.changedDate)
  },
  methods: {
    changeDate() {
      this.$emit('changeDate',this.changedDate);
      this.$emit('showshowshow',false);
      // this.isVisible = false;
    }
  },
})
</script>

<style scoped>
@import "./todo-date.css"
</style>