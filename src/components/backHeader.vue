<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goBack () {
  router.back()
}
</script>

<template>
  <div
    class="
      grid grid-cols-4
      items-center
      h-14
      justify-items-center
      header-shadow
      fixed
      w-screen
      bg-white
      inset-x-0
      top-0
      z-10
    "
  >
    <slot name="arrow">
      <span
        class="text-xl cursor-pointer"
        @click="goBack"
      ><fa icon="arrow-right" /></span>
    </slot>
    <div class="justify-self-start col-span-2">
      <p class="text-base font-black font-IRANSans">
        <slot />
      </p>
    </div>
    <router-link
      to="/"
    >
      <img
        alt="Vue logo"
        src="../assets/logo.png"
        class="h-12"
      >
    </router-link>
  </div>
</template>
