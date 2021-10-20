<script lang="ts" setup>
import backHeader from '../components/BackHeader.vue'
</script>
<template>
  <backHeader>
    درباره ما
  </backHeader>
  <div class="blur" />
  <div class="about-box">
    <img
      src="../assets/logo.png"
      class="w-32"
    >
    <div class="-mt-4 mb-4">
      <p class="font-bold">
        نبراس
      </p>
      <p class="text-sm">
        دیکشنری عربی به فارسی
      </p>
    </div>
    <div
      class="px-5 w-screen"
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
      <p class="text-sm text-center">
        کلیه حقوق این نرم افزار متعلق به گروه آموزشی نبراس است<br> و هرگونه کپی برداری از آن بدون ذکر منبع شرعا و قانونا ممنوع است.
      </p>
    </div>
  </div>
</template>
<style>
.blur{
  @apply bg-logo w-screen h-screen bg-contain bg-no-repeat bg-opacity-75 bg-top blur-sm opacity-70
}
.about-box{
  @apply absolute top-44 grid w-screen text-center justify-items-center font-IRANSans cursor-default
}
.instagram{
  @apply w-full bg-red-600 rounded-3xl h-10 flex items-center pl-4 gap-2 text-white mb-4 select-all
}
.telegram{
  @apply w-full bg-blue-600 rounded-3xl h-10 flex items-center pl-4 gap-2 text-white mb-4 select-all
}
</style>
