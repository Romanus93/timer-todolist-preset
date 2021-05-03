<template>
  <div class="exex">
    <button @click="upCount(item)">
        <h1> Ex btn </h1>
      </button>
      <h2> {{ count }} </h2>
  </div>
  <div style="margin-top: 100px">
    <todo-date 
      :dateOfTodoItem="date"
    />
    <button>x</button>
  </div>
  <div>
    <span><img class="rotate" src="/src/assets/and-so-on/loader.svg" alt=""></span>
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
  .rotate {
    animation: rotation 3s infinite steps(10, start);
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>