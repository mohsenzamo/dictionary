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
    <span
      class="text-xl"
      @click="goBack"
    ><fa icon="arrow-right" /></span>
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

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'BackHeader',
  setup () {
    const router = useRouter()
    function goBack () {
      router.back()
    }
    return {
      goBack
    }
  }
})
</script>
