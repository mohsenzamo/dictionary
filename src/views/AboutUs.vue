<script lang="ts" setup>
import { ref } from 'vue'
import backHeader from '../components/BackHeader.vue'
import footerLarge from '../components/footerLarge.vue'
import HeaderLarge from '../components/HeaderLarge.vue'
const mediaMatcher = matchMedia('(max-width: 1024px)')
const laptopScreen = ref(mediaMatcher.matches)
mediaMatcher.addListener(() => {
  laptopScreen.value = !laptopScreen.value
})
</script>
<template>
  <backHeader v-if="laptopScreen">
    درباره ما
  </backHeader>
  <HeaderLarge v-else />
  <div class="bg-logo w-screen h-screen bg-contain bg-no-repeat bg-opacity-75 bg-top blur-sm opacity-70 lg:w-full" />
  <div class="absolute top-44 lg:top-28 grid w-screen text-center justify-items-center font-IRANSans cursor-default lg:w-full">
    <img
      src="../assets/logo.png"
      class="w-32 lg:w-72"
    >
    <div class="-mt-4 mb-4">
      <p class="font-bold lg:text-2xl">
        نبراس
      </p>
      <p class="text-sm lg:text-xl">
        دیکشنری عربی به فارسی
      </p>
    </div>
    <div
      class="px-5 w-screen lg:w-5/12"
      style="direction: ltr;"
    >
      <p class="w-full bg-red-600 rounded-3xl h-10 flex items-center pl-4 gap-2 text-white mb-4 select-all lg:h-14 lg:rounded-full lg:text-xl">
        <fa :icon="['fab','instagram']" />
        @Nebras_arabic
      </p>
      <p class="w-full bg-blue-600 rounded-3xl h-10 flex items-center pl-4 gap-2 text-white mb-4 select-all lg:h-14 lg:rounded-full lg:text-xl">
        <fa :icon="['fab','telegram']" />
        @Nebras_arabic
      </p>
    </div>
    <div class="px-5">
      <p class="text-sm text-center lg:text-xl">
        کلیه حقوق این نرم افزار متعلق به گروه آموزشی نبراس است<br> و هرگونه کپی برداری از آن بدون ذکر منبع شرعا و قانونا ممنوع است.
      </p>
    </div>
  </div>
  <footerLarge
    v-if="!laptopScreen"
    class="absolute bottom-0"
  />
</template>
