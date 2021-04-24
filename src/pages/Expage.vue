<template>
  <div class="exex" style="padding: 200px">
    <button @click="upCount(item)">
        <h1> Ex btn </h1>
      </button>
      <h2> {{ count }} </h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      item: 5,
      count: 0
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