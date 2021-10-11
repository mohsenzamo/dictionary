<template>
  <Header />
  <router-view />
  <br />
  <router-link to="/">صفحه نخست</router-link>
  <br />
  <router-link to="/list">فهرست</router-link>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import Header from "./components/Header.vue";
export default defineComponent({
  name: "App",
  components: {
    Header,
  },
  setup() {
    return {};
  },
});
</script>
