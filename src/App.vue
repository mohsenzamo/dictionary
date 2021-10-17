<script lang="ts" setup>
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition
      name="page"
      mode="out-in"
    >
      <div
        :key="route.path"
        class="bg-gray-200"
      >
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
