<template>
  <div>
    <Calendar />
    <DatePicker v-model="date" />
    <h1>{{ momentJs() }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Calendar, DatePicker } from 'v-calendar';
import moment from 'moment';

export default defineComponent({
  name: 'CalendarTest',
  components: {
    Calendar,
    DatePicker
  },
  data() {
    return {
      date: new Date()
    }
  },
  methods: {
    momentJs() {
      const time = moment();
      return time
    }
  },
})
</script>

<style scoped>

</style>