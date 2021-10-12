<template>
  <div class="h-screen bg-gray-200 pt-16">
    <div class="h-11 flex items-center justify-center">
      <input
        type="text"
        placeholder="جستجو کنید ...."
        class="h-full rounded-r-full pr-2 focus:outline-none font-IRANSans"
      />
      <button
        class="
          bg-white
          rounded-l-full
          h-full
          text-sm
          w-10
          grid
          items-center
          justify-items-center
          text-gray-500
          active:bg-gray-300
          ...
        "
      >
        <fa icon="search" />
      </button>
    </div>
    <div class="h-full flex flex-wrap gap-x-4 justify-center mt-2">
      <div class="category-box">
        <fa icon="book-reader" class="text-green-700 text-2xl" />
        <p>نشان شده ها</p>
      </div>
      <div class="category-box">
        <fa icon="users" class="text-pink-700 text-2xl" />
        <p>پیشنهادات مردمی</p>
      </div>
      <div class="category-box">
        <fa icon="globe" class="text-red-700 text-2xl" />
        <p>اصطلاحات خلیجی</p>
      </div>
      <div class="category-box">
        <fa icon="tools" class="text-purple-400 text-2xl" />
        <p>لوازم شخصی</p>
      </div>
      <div class="category-box">
        <fa icon="clock" class="text-yellow-300 text-2xl" />
        <p>زمان/روزهای هفته</p>
      </div>
      <div class="category-box">
        <fa icon="couch" class="text-blue-500 text-2xl" />
        <p>لوازم منزل</p>
      </div>
      <div class="category-box">
        <fa icon="palette" class="text-blue-600 text-2xl" />
        <p>رنگ ها</p>
      </div>
      <div class="category-box">
        <div v-if="lockValue == 1" class="absolute bg-black w-full h-full rounded-3xl opacity-50">
          <fa icon="lock" class="absolute top-2 right-2 text-yellow-500" />
        </div>
        <fa icon="briefcase-medical" class="text-green-500 text-2xl" />
        <p>پزشکی</p>
      </div>
      <div class="category-box">
        <div v-if="lockValue == 1" class="absolute bg-black w-full h-full rounded-3xl opacity-50">
          <fa icon="lock" class="absolute top-2 right-2 text-yellow-500" />
        </div>
        <fa icon="user-nurse" class="text-yellow-500 text-2xl" />
        <p>جملات کاربردی پزشکی</p>
      </div>
      <div class="category-box">
        <div v-if="lockValue == 1" class="absolute bg-black w-full h-full rounded-3xl opacity-50">
          <fa icon="lock" class="absolute top-2 right-2 text-yellow-500" />
        </div>
        <fa icon="question-circle" class="text-yellow-800 text-2xl" />
        <p>ادات سوال</p>
      </div>
      <div class="category-box">
        <div v-if="lockValue == 1" class="absolute bg-black w-full h-full rounded-3xl opacity-50">
          <fa icon="lock" class="absolute top-2 right-2 text-yellow-500" />
        </div>
        <p>فعل ماضی</p>
      </div>
      <div class="category-box">
        <div v-if="lockValue == 1" class="absolute bg-black w-full h-full rounded-3xl opacity-50">
          <fa icon="lock" class="absolute top-2 right-2 text-yellow-500" />
        </div>
        <p>فعل مضارع</p>
      </div>
      <div class="category-box">
        <div v-if="lockValue == 1" class="absolute bg-black w-full h-full rounded-3xl opacity-50">
          <fa icon="lock" class="absolute top-2 right-2 text-yellow-500" />
        </div>
        <p>فعل امر</p>
      </div>
      <div class="category-box">
        <div v-if="lockValue == 1" class="absolute bg-black w-full h-full rounded-3xl opacity-50">
          <fa icon="lock" class="absolute top-2 right-2 text-yellow-500" />
        </div>
        <p>فعل نهی</p>
      </div>
      <div class="category-box">
        <div v-if="lockValue == 1" class="absolute bg-black w-full h-full rounded-3xl opacity-50">
          <fa icon="lock" class="absolute top-2 right-2 text-yellow-500" />
        </div>
        <fa icon="cloud-sun" class="text-blue-900 text-2xl" />
        <p>آب و هوا</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
export default defineComponent({
  name: "Home",
  setup() {
    let lockValue = ref(1);
    return {
      lockValue,
    };
  },
});
</script>
