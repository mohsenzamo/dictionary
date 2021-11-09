<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import backHeader from '../components/BackHeader.vue'
import HeaderLarge from '../components/HeaderLarge.vue'
const screenWidth = ref(window.screen.width)
</script>
<template>
  <backHeader v-if="screenWidth < 1024">
    درباره ما
  </backHeader>
  <HeaderLarge v-else />
  <div class="blur" />
  <div class="about-box">
    <img
      src="../assets/logo.png"
      class="w-32 xl:w-72"
    >
    <div class="-mt-4 mb-4">
      <p class="font-bold xl:text-2xl">
        نبراس
      </p>
      <p class="text-sm xl:text-xl">
        دیکشنری عربی به فارسی
      </p>
    </div>
    <div
      class="px-5 w-screen xl:w-5/12"
      style="direction: ltr;"
    >
      <p class="instagram">
        <fa :icon="['fab','instagram']" />
        @Nebras_arabic
      </p>
      <p class="telegram">
        <fa :icon="['fab','telegram']" />
        @Nebras_arabic
      </p>
    </div>
    <div class="px-5">
      <p class="text-sm text-center xl:text-xl">
        کلیه حقوق این نرم افزار متعلق به گروه آموزشی نبراس است<br> و هرگونه کپی برداری از آن بدون ذکر منبع شرعا و قانونا ممنوع است.
      </p>
    </div>
  </div>
</template>
<style>
.blur{
  @apply bg-logo w-screen h-screen bg-contain bg-no-repeat bg-opacity-75 bg-top blur-sm opacity-70 xl:w-full
}
.about-box{
  @apply absolute top-44 grid w-screen text-center justify-items-center font-IRANSans cursor-default xl:w-full
}
.instagram{
  @apply w-full bg-red-600 rounded-3xl h-10 flex items-center pl-4 gap-2 text-white mb-4 select-all xl:h-14 xl:rounded-full xl:text-xl
}
.telegram{
  @apply w-full bg-blue-600 rounded-3xl h-10 flex items-center pl-4 gap-2 text-white mb-4 select-all xl:h-14 xl:rounded-full xl:text-xl
}
</style>
