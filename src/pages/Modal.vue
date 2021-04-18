<template>
  <div class="background">
    <ul class="list">
      <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, velit.</li>
      <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, velit.</li>
      <li><button type="button" @click="showModal">click!</button></li>
      <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, velit.</li>
      <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, velit.</li>
    </ul>
    <div class="modal" v-show="show">
      <div>
        modal 
        <div class="modalWindow">
          <button type="button" @click="closeModal">click!</button>  
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Modal',
  data() {
    return {
      show: false
    }
  },
  methods: {
    showModal() {
      this.show = true   
    },
    closeModal() {
      this.show = false
    }
  },
})
</script>

<style scoped>
  ul  {
    padding: 0;
    margin: 0;
  }
  
  .background {
    width: 90vw;
    height: 90vh;
  }
  .list {
    width: 90%;
    height: 90%;
    background-color: darkgoldenrod;
    padding-left: 0;
  }
  .list > li {
    width: 100%;
    height: 20%;
  }
  .modal {
    width: 80%;
    height: 80%;
    opacity: 0.5;
    background-color: darkseagreen;
    position: relative;
    top: -85%;
    left: 5%;
  }
  .modalWindow {
    width: 50px;
    height: 50px;
  }
</style>