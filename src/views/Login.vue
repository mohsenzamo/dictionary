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
const formValue = ref(false)
</script>
<template>
  <backHeader v-if="laptopScreen">
    صفحه ورود
  </backHeader>
  <HeaderLarge v-else />
  <div class="hidden bg-logo w-screen h-screen bg-contain bg-no-repeat bg-opacity-75 bg-top blur-sm opacity-70 lg:w-full lg:block" />

  <div class="h-screen grid items-center justify-center lg:absolute lg:inset-0 ">
    <transition
      name="scaleRight"
      appear
    >
      <div
        v-if="formValue"
        class="bg-white pt-9 pr-9 pl-9 pb-5 text-center w-80 rounded-2xl shadow-2xl lg:w-96 lg:h-4/6 lg:mt-28"
      >
        <form class="w-full">
          <div class="relative mb-11">
            <input
              type="text"
              required
              class="block w-full border-b-2 border-solid border-black focus:outline-none border-opacity-60 lg:h-12"
            >
            <label class="text-yellow-600 absolute pointer-events-none right-1 -top-2 transition-all text-lg opacity-60 font-IRANSans lg:top-0">نام کاربری</label>
            <span class="focus-border" />
          </div>
          <div class="relative mb-11 w-full">
            <input
              type="text"
              required
              class="block w-full border-b-2 border-solid border-black focus:outline-none border-opacity-60 lg:h-12"
            >
            <label class="text-yellow-600 absolute pointer-events-none right-1 -top-2 transition-all text-lg opacity-60 font-IRANSans lg:top-0">ایمیل</label>
            <span class="focus-border" />
          </div>
          <div class="relative mb-11 w-full">
            <input
              type="text"
              required
              class="block w-full border-b-2 border-solid border-black focus:outline-none border-opacity-60 lg:h-12"
            >
            <label class="text-yellow-600 absolute pointer-events-none right-1 -top-2 transition-all text-lg opacity-60 font-IRANSans lg:top-0">پسورد</label>
            <span class="focus-border" />
          </div>
          <button
            type="button"
            class="bg-yellow-500 w-full h-10 font-IRANSans rounded-lg lg:mt-5"
          >
            ثبت نام
          </button>
        </form>
        <p class="mt-4 font-IRANSans text-xs">
          حساب کاربری دارید!
          <span
            class="text-blue-700 cursor-pointer"
            @click="formValue = !formValue"
          >ورود به حساب</span>
        </p>
      </div>
    </transition>
    <transition
      name="scaleLeft"
      appear
    >
      <div
        v-if="formValue == false"
        class="bg-white pt-9 pr-9 pl-9 pb-5 text-center w-80 rounded-2xl shadow-2xl lg:w-96 lg:h-3/6"
      >
        <form class="w-full">
          <div class="relative mb-11">
            <input
              type="text"
              required
              class="block w-full border-b-2 border-solid border-black focus:outline-none  border-opacity-60 lg:h-12"
            >
            <label class="text-yellow-600 absolute pointer-events-none right-1 -top-2 transition-all text-lg opacity-60 font-IRANSans lg:top-0">نام کاربری</label>
            <span class="focus-border" />
          </div>
          <div class="relative mb-11 w-full">
            <input
              type="text"
              required
              class="block w-full border-b-2 border-solid border-black focus:outline-none  border-opacity-60 lg:h-12"
            >
            <label class="text-yellow-600 absolute pointer-events-none right-1 -top-2 transition-all text-lg opacity-60 font-IRANSans lg:top-0">پسورد</label>
            <span class="focus-border" />
          </div>
          <button
            type="button"
            class="bg-yellow-500 w-full h-10 font-IRANSans rounded-lg lg:mt-3"
          >
            ورود
          </button>
        </form>
        <p class="mt-4 font-IRANSans text-xs">
          حساب کاربری ندارید؟
          <span
            class="text-blue-700 cursor-pointer"
            @click="formValue = !formValue"
          >ثبت نام کنید</span>
        </p>
      </div>
    </transition>
  </div>
  <footerLarge
    v-if="!laptopScreen"
    class="absolute bottom-0"
  />
</template>
<style>
input:focus + label {
  @apply -top-6 text-sm opacity-100
}
input ~ .focus-border{
  @apply absolute bottom-0 left-1/2 w-0 h-0.5 bg-gray-400 transition-all duration-500
}
input:focus ~ .focus-border{
  @apply w-full transition-all left-0
}
.scaleLeft-enter-active,
.scaleRight-enter-active{
  transition: all 0.7s ease;
}
.scaleLeft-leave-active,
.scaleRight-leave-active {
    transition: all 0.6s ease;
}

.scaleRight-enter-from,
.scaleRight-leave-to{
    z-index: 5;
    opacity: 0;
  transform: rotateY(-180deg);
  position: absolute;
}
.scaleRight-leave-from{
    opacity: 0;
}
.scaleLeft-enter-from,
.scaleLeft-leave-to{
    z-index: 5;
    opacity: 0;
  transform: rotateY(180deg);
  position: absolute;
}
.scaleLeft-leave-from{
    opacity: 0;
}
</style>
