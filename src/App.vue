<script lang="ts" setup>
</script>

<template>
  <transition
    name="page"
    mode="out-in"
  >
    <router-view />
  </transition>
</template>
<style>.page-enter-active, .page-leave-active {
  transition: opacity 1s, transform 1s;
}
.page-enter, .page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

</style>
