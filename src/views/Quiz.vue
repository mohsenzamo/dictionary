<script lang="ts" setup>
import { ref } from 'vue'
import backHeader from '../components/backHeader.vue'
import Modal from '../components/Modal.vue'
import { useRouter } from 'vue-router'
const modalQuizValue = ref(false)
const router = useRouter()
function goBack () {
  router.back()
}
</script>
<template>
  <backHeader>
    <template #arrow>
      <span
        class="text-xl"
        @click="modalQuizValue = true"
      ><fa icon="arrow-right" /></span>
    </template>
    <template #default>
      تمرین لغات
    </template>
  </backHeader>
  <transition name="modal">
    <modal
      v-if="modalQuizValue"
      @close="modalQuizValue = false"
    >
      <div class="grid font-IRANSans text-sm gap-4">
        <div>
          <p class="flex justify-between">
            <span>تعداد کل سوالات</span>
            <span>3</span>
          </p>
          <p class="flex justify-between text-green-600">
            <span>تعداد پاسخ درست</span>
            <span>2</span>
          </p>
          <p class="flex justify-between text-red-600">
            <span>تعداد پاسخ غلط</span>
            <span>1</span>
          </p>
          <p class="flex justify-between">
            <span>زمان</span>
            <span>1 دقیقه و 11 ثانیه</span>
          </p>
        </div>
        <button
          class="
        bg-yellow-500
        rounded-md
        h-8
      "
      @click="goBack"
        >
          <p>خروج از تمرین لغات</p>
        </button>
      </div>
    </modal>
  </transition>
  <div class="pt-16 w-screen h-auto grid">
    <div
      class="w-full h-auto float-right flex gap-x-3 pr-5 text-white font-IRANSans mt-2"
    >
      <p class="bg-green-600 rounded-2xl w-14 flex items-center gap-x-3 pr-1 shadow-2xl">
        <fa icon="check-circle" />
        <span>2</span>
      </p>
      <p class="bg-red-600 rounded-2xl w-14 flex items-center gap-x-3 pr-1 shadow-2xl">
        <fa icon="times-circle" />
        <span>1</span>
      </p>
    </div>
    <div class="w-11/12 h-44 bg-white grid grid-rows-2 justify-items-center justify-self-center shadow-lg mt-3 gap-y-5 rounded-2xl">
      <p class="self-end font-IRANSans text-sm">
        معنی عبارت زیر چیست؟
      </p>
      <p class="self-start font-IRANSans font-bold text-xl">
        لاتندل (مخاطب مذکر)
      </p>
    </div>
    <div class="h-full w-screen grid grid-cols-2 grid-rows-2 gap-3 p-4">
      <p class="w-full bg-white rounded-2xl h-32 grid justify-items-center items-center font-IRANSans text-base shadow-2xl active:scale-105">
        نترس
      </p>
      <p class="w-full bg-white rounded-2xl h-32 grid justify-items-center items-center font-IRANSans text-base shadow-2xl active:scale-105">
        نیاز نداشته باش
      </p>
      <p class="w-full bg-green-500 rounded-2xl h-32 grid justify-items-center items-center font-IRANSans text-base shadow-2xl active:scale-105">
        پیدا نکن
      </p>
      <p class="w-full bg-red-500 rounded-2xl h-32 grid justify-items-center items-center font-IRANSans text-base shadow-2xl active:scale-105">
        زنگ نزن
      </p>
    </div>
  </div>
</template>
<style>

</style>
