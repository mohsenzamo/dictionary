<script lang="ts" setup>
</script>

<template>
  <!-- <transition
    name="page"
    mode="out-in"
  >
    <router-view />
  </transition> -->
  <router-view v-slot="{ Component, route }">
    <transition
      name="page"
      mode="out-in"
    >
      <div :key="route.path">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>
<style>
.page-enter-active, .page-leave-active {
  transition: opacity 1s, transform 1s;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

</style>
