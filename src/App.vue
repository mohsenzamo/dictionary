<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" class="bg-yellow-300" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <router-view />
  <br>
  <router-link to="/">صفحه نخست</router-link>
  <br>
  <router-link to="/list">فهرست</router-link>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
