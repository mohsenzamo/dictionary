<template>
  <Header />
  <div class="h-full pt-16">
    <div class="h-11 flex items-center justify-center">
      <input
        type="text"
        placeholder="جستجو کنید ...."
        class="h-full w-64 rounded-r-full pr-2 focus:outline-none font-IRANSans"
      >
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
    <div class="h-full flex flex-wrap gap-4 justify-center mt-2 mb-16">
      <div
        class="category-box"
        @click="pushLink(list)"
      >
        <fa
          icon="book-reader"
          class="text-green-700 text-2xl"
        />
        <p>نشان شده ها</p>
      </div>
      <div
        class="category-box"
        @click="pushLink(list)"
      >
        <fa
          icon="users"
          class="text-pink-700 text-2xl"
        />
        <p>پیشنهادات مردمی</p>
      </div>
      <div
        class="category-box"
        @click="pushLink(list)"
      >
        <fa
          icon="globe"
          class="text-red-700 text-2xl"
        />
        <p>اصطلاحات خلیجی</p>
      </div>
      <div class="category-box">
        <fa
          icon="tools"
          class="text-purple-400 text-2xl"
        />
        <p>لوازم شخصی</p>
      </div>
      <div class="category-box">
        <fa
          icon="clock"
          class="text-yellow-300 text-2xl"
        />
        <p>زمان/روزهای هفته</p>
      </div>
      <div class="category-box">
        <fa
          icon="couch"
          class="text-blue-500 text-2xl"
        />
        <p>لوازم منزل</p>
      </div>
      <div class="category-box">
        <fa
          icon="palette"
          class="text-blue-600 text-2xl"
        />
        <p>رنگ ها</p>
      </div>
      <div class="category-box">
        <div
          v-if="lockValue == 1"
          class="absolute bg-black w-full h-full rounded-3xl opacity-50"
        >
          <fa
            icon="lock"
            class="absolute top-2 right-2 text-yellow-500"
          />
        </div>
        <fa
          icon="briefcase-medical"
          class="text-green-500 text-2xl"
        />
        <p>پزشکی</p>
      </div>
      <div class="category-box">
        <div
          v-if="lockValue == 1"
          class="absolute bg-black w-full h-full rounded-3xl opacity-50"
        >
          <fa
            icon="lock"
            class="absolute top-2 right-2 text-yellow-500"
          />
        </div>
        <fa
          icon="user-nurse"
          class="text-yellow-500 text-2xl"
        />
        <p>جملات کاربردی پزشکی</p>
      </div>
      <div class="category-box">
        <div
          v-if="lockValue == 1"
          class="absolute bg-black w-full h-full rounded-3xl opacity-50"
        >
          <fa
            icon="lock"
            class="absolute top-2 right-2 text-yellow-500"
          />
        </div>
        <fa
          icon="question-circle"
          class="text-yellow-800 text-2xl"
        />
        <p>ادات سوال</p>
      </div>
      <div class="category-box">
        <div
          v-if="lockValue == 1"
          class="absolute bg-black w-full h-full rounded-3xl opacity-50"
        >
          <fa
            icon="lock"
            class="absolute top-2 right-2 text-yellow-500"
          />
        </div>
        <p>فعل ماضی</p>
      </div>
      <div class="category-box">
        <div
          v-if="lockValue == 1"
          class="absolute bg-black w-full h-full rounded-3xl opacity-50"
        >
          <fa
            icon="lock"
            class="absolute top-2 right-2 text-yellow-500"
          />
        </div>
        <p>فعل مضارع</p>
      </div>
      <div class="category-box">
        <div
          v-if="lockValue == 1"
          class="absolute bg-black w-full h-full rounded-3xl opacity-50"
        >
          <fa
            icon="lock"
            class="absolute top-2 right-2 text-yellow-500"
          />
        </div>
        <p>فعل امر</p>
      </div>
      <div class="category-box">
        <div
          v-if="lockValue == 1"
          class="absolute bg-black w-full h-full rounded-3xl opacity-50"
        >
          <fa
            icon="lock"
            class="absolute top-2 right-2 text-yellow-500"
          />
        </div>
        <p>فعل نهی</p>
      </div>
      <div class="category-box">
        <div
          v-if="lockValue == 1"
          class="absolute bg-black w-full h-full rounded-3xl opacity-50"
        >
          <fa
            icon="lock"
            class="absolute top-2 right-2 text-yellow-500"
          />
        </div>
        <fa
          icon="cloud-sun"
          class="text-blue-900 text-2xl"
        />
        <p>آب و هوا</p>
      </div>
    </div>
  </div>
  <div
    class="
      w-screen
      fixed
      inset-x-0
      bottom-0
      h-12
      grid grid-cols-2
      font-IRANSans
      gap-x-2
    "
  >
    <button
      class="
        bg-yellow-500
        flex
        items-center
        justify-center
        rounded-t-2xl
        gap-x-3
      "
      @click="pushLink(quiz)"
    >
      <fa icon="pencil-alt" />
      <p>تمرین لغات</p>
    </button>
    <button
      class="
        bg-yellow-500
        flex
        items-center
        justify-center
        rounded-t-2xl
        gap-x-3
      "
      @click="change"
    >
      <fa icon="spell-check" />
      <p>آزمون مرحله ای</p>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
export default defineComponent({
  name: 'Home',
  components: {
    Header
  },
  setup () {
    const router = useRouter()
    const lockValue = ref(1)
    const quiz = ref('Quiz')
    const list = ref('List')
    function pushLink (link:string) {
      router.push({
        name: link
      })
    }
    function change () {
      if (lockValue.value == 1) {
        lockValue.value = 0
      } else {
        lockValue.value = 1
      }
    }
    return {
      lockValue,
      pushLink,
      change,
      quiz,
      list
    }
  }
})
</script>
