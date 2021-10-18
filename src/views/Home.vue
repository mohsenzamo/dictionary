<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Modal from '../components/Modal.vue'
const router = useRouter()
const lockValue = ref(true)
function pushLinkList (link:string, param:string) {
  router.push({
    name: link,
    params: { id: param }
  })
}
function pushLink (link:string) {
  router.push({
    name: link
  })
}
const modalPremiumValue = ref(false)
function change () {
  lockValue.value = !lockValue.value
}
function submit () {
  alert('mohsen')
}

// -----------------------------------search---------------------------------------
const searchQuery = ref('')
const words = [
  { id: 1, title: 'ali' },
  { id: 2, title: 'hassan' },
  { id: 3, title: 'alireza' },
  { id: 4, title: 'behzad' },
  { id: 5, title: 'behnam' }
]

// -----------------------------------search---------------------------------------

</script>

<template>
  <Header />
  <transition name="modal">
    <modal
      v-if="modalPremiumValue"
      @close="modalPremiumValue = false"
    >
      <div class="grid font-IRANSans text-sm gap-4">
        <p class="">
          برای استفاده از این قسمت باید نرم افزار را به نسخه طلایی ارتقا دهید.<br>با دریافت نسخه طلایی نرم افزار، امکان دسترسی به هزاران لغت در دسته بندی های مختلف را خواهید داشت.
        </p>
        <button
          class="
        bg-yellow-500
        rounded-md
        h-8
      "
        >
          <p>ارتقا به نسخه طلایی</p>
        </button>
      </div>
    </modal>
  </transition>
  <div class="h-full pt-16">
    <div class="h-11 flex fixed top-16 z-10  w-screen justify-center">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="جستجو کنید ...."
        class="h-full rounded-r-full rounded-l-full pr-6 focus:outline-none focus:ring-4 ring-yellow-500 ring-opacity-50 font-IRANSans w-80 z-20"
        @keyup.enter="submit"
      >
      <span
        class="z-30 h-full leading-snug font-normal text-center text-gray-500 rounded text-base flex items-center  justify-start w-12 pr-3 py-3 -mr-12"
        @click="submit"
      >
        <fa icon="search" />
      </span>
    </div>
    <!-- ------------------------------------- searchedWords ---------------------------------------------->
    <div
      v-if="searchQuery.length>0"
      class="grid grid-rows-9 bg-white  gap-x-8 gap-y-2 justify-items-stretch fixed z-10 w-screen top-28 h-full "
    >
      <!--------------------------------------- find ---------------------------------------------->
      <template v-if="searchQuery.length<3">
        <div
          v-for="n in 9"
          :key="n"
          class="bg-gray-100 even:bg-gray-300 row-span-1 rounded-lg active:-translate-y-1"
        >
          <div class="bg-transparent w-28 h-14 float-right rounded-lg grid grid-rows-2 justify-items-center items-center ">
            <div class="font-semibold">
              semibol text
            </div>
            <div class="font-light">
              light text
            </div>
          </div>
          <div class="bg-transparent w-28 h-14 float-left rounded-lg grid grid-cols-2 justify-items-center items-center">
            <div>
              <fa
                icon="bookmark"
                style="color:rgb(11, 182, 11);"
              />
            </div>
            <div>
              <fa
                icon="volume-off"
              />
            </div>
          </div>
        </div>
      </template>
      <!--------------------------------------- find ---------------------------------------------->
      <!--------------------------------------- not find ---------------------------------------------->
      <div
        v-if="searchQuery.length>=3"
        class="bg-gray-200 h-screen w-screen text-center "
      >
        <p class="font-IRANSans pt-16 text-xl">
          نتیجه ای یافت نشد!
        </p>
        <br>
        <fa
          icon="frown"
          style="color: rgba(245, 158, 11) ; font-size: 32px;"
        />
      </div>
    <!--------------------------------------- not find ---------------------------------------------->
    </div>
    <!--------------------------------------- searchedWords -------------------------------------------- -->

    <div class="h-full flex flex-wrap gap-4 justify-center mt-14 mb-16">
      <div
        class="category-box"
        @click="pushLinkList('List','نشان شده ها')"
      >
        <fa
          icon="book-reader"
          class="text-green-700 text-2xl"
        />
        <p>نشان شده ها</p>
      </div>
      <div
        class="category-box"
        @click="pushLinkList('List','پیشنهادات مردمی')"
      >
        <fa
          icon="users"
          class="text-pink-700 text-2xl"
        />
        <p>پیشنهادات مردمی</p>
      </div>
      <div
        class="category-box"
        @click="pushLinkList('List','اصطلاحات خلیجی')"
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
      <div
        class="category-box"
      >
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
          v-if="lockValue"
          class="absolute bg-gray-600 w-full h-full rounded-3xl opacity-50"
          @click="modalPremiumValue = true"
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
          v-if="lockValue"
          class="absolute bg-gray-600 w-full h-full rounded-3xl opacity-50"
          @click="modalPremiumValue = true"
        >
          <fa
            icon="lock"
            class="absolute top-2 right-2 text-yellow-500"
          />
        </div>
        <fa
          icon="user-nurse"
          class="text-yellow-500 text-2xl w-1/5"
        />
        <p>جملات کاربردی پزشکی</p>
      </div>
      <div class="category-box">
        <div
          v-if="lockValue"
          class="absolute bg-gray-600 w-full h-full rounded-3xl opacity-50"
          @click="modalPremiumValue = true"
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
          v-if="lockValue"
          class="absolute bg-gray-600 w-full h-full rounded-3xl opacity-50"
          @click="modalPremiumValue = true"
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
          v-if="lockValue"
          class="absolute bg-gray-600 w-full h-full rounded-3xl opacity-50"
          @click="modalPremiumValue = true"
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
          v-if="lockValue"
          class="absolute bg-gray-600 w-full h-full rounded-3xl opacity-50"
          @click="modalPremiumValue = true"
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
          v-if="lockValue"
          class="absolute bg-gray-600 w-full h-full rounded-3xl opacity-50"
          @click="modalPremiumValue = true"
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
          v-if="lockValue"
          class="absolute bg-gray-600 w-full h-full rounded-3xl opacity-50"
          @click="modalPremiumValue = true"
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
      @click="pushLink('Quiz')"
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
<style>
</style>
