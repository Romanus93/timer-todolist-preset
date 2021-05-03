<template>
  <div class="exex">
    <button @click="upCount(item)">
        <h1> Ex btn </h1>
      </button>
      <h2> {{ count }} </h2>
  </div>
  <div style="margin-top: 100px">
    <todo-date 
      :date="date"
    />
    <button>x</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TodoDate from '../components/todoDate/TodoDate.vue'

export default defineComponent({
  components: {TodoDate},
  data() {
    return {
      item: 5,
      count: 0,
      date: new Date()
    }
  },
  methods: {
    upCount(param: number): void {
      console.log('1');
      this.count += param       
    }
  },
})
</script>

<style scoped>
  
</style>