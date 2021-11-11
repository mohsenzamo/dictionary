<script lang="ts" setup>import { computed } from 'vue'
import { useHomeSearchRepo } from '../datasource/repository/homeSearchRepo'
const wordsLg = computed(() => useHomeSearchRepo().words)
const searchFindLg = computed(() => useHomeSearchRepo().searchFind)
const searchLoadingLg = computed(() => useHomeSearchRepo().searchLoading)
console.log(searchLoadingLg.value)
const listLoadingLg = computed(() => useHomeSearchRepo().listLoading)
</script>
<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div
      class="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-70"
      @click="$emit('close')"
    />
    <div
      class="w-10/12 bg-gray-300 rounded-xl shadow-2xl relative animate-open p-6 h-auto lg:w-6/12"
    >
      <slot />
      <button
        class="absolute top-1 left-2 text-xl"
        @click="$emit('close')"
      >
        <fa icon="times" />
      </button>
    </div>
  </div>
</template>
<style>
.modal-enter-from {
  opacity: 0;
}
.modal-enter-to {
  opacity: 1;
}
.modal-enter-to {
  transition: all .5s ease;
}
.modal-leave-from {
  opacity: 1;
}
.modal-leave-to {
  opacity: 0;
}
.modal-leave-active {
  transition: all .5s ease;
}
</style>
