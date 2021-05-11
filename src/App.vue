<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  beforeCreate() {
    console.log('a')
  },
})
</script>

<style>
@import "./index.css";
</style>