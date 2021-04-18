<template>
  <div>
    <!-- <router-link to="/">HelloWorld</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link :to="{ name: 'modal' }">Modal</router-link> |
    <router-link :to="{ name: 'calendarTest' }">CalendarTest</router-link> |
    <router-link to="/calendar">Calendar</router-link> |
    <router-link :to="{ name: 'TodoForm' }">create-edit-Component</router-link> -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style>
@import "./index.css";
</style>