<template>
  <backHeader> تمرین لغات </backHeader>
  <div class="pt-16 w-screen h-auto grid">
    <div class="w-full h-auto float-right flex gap-x-3 pr-5 text-white font-IRANSans mt-2">
      <p class="bg-green-600 rounded-2xl w-14 flex items-center gap-x-3 pr-1 shadow-2xl">
          <fa icon="check-circle"/>
          <span>2</span>
      </p>
      <p class="bg-red-600 rounded-2xl w-14 flex items-center gap-x-3 pr-1 shadow-2xl">
          <fa icon="times-circle"/>
          <span>1</span>
      </p>
    </div>
    <div class="w-9/12 h-44 bg-white grid grid-rows-2 justify-items-center justify-self-center shadow-lg mt-3 gap-y-5 rounded-2xl">
      <p class="self-end font-IRANSans text-sm">معنی عبارت زیر چیست؟</p>
      <p class="self-start font-IRANSans font-bold text-xl">لاتندل (مخاطب مذکر)</p>
    </div>
    <div class="h-full w-screen grid grid-cols-2 grid-rows-2 gap-3 p-4">
        <p class="w-full bg-white rounded-2xl h-32 grid justify-items-center items-center font-IRANSans text-base shadow-2xl">نترس</p>
        <p class="w-full bg-white rounded-2xl h-32 grid justify-items-center items-center font-IRANSans text-base shadow-2xl">نیاز نداشته باش</p>
        <p class="w-full bg-green-500 rounded-2xl h-32 grid justify-items-center items-center font-IRANSans text-base shadow-2xl">پیدا نکن</p>
        <p class="w-full bg-red-500 rounded-2xl h-32 grid justify-items-center items-center font-IRANSans text-base shadow-2xl">زنگ نزن</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import backHeader from "../components/backHeader.vue";
export default defineComponent({
  name: "Quiz",
  components: {
    backHeader,
  },
  setup() {
    const router = useRouter();

    return {};
  },
});
</script>
