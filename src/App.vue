<script lang="ts" setup>
import { ref } from 'vue'

const x = ref(0)
</script>

<template>
  {{ x }}
  <router-view />
</template>
