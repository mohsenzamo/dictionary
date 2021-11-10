<script lang="ts" setup>
import { computed, ref } from 'vue'
import Modal from '../components/Modal.vue'
import { useRouter } from 'vue-router'
import { usePWAStore } from '../datasource/repository/PWA'
const router = useRouter()
const modalSearchValue = ref(false)
const modalGuideValue = ref(false)
const searchQuery = ref('')
const pathName = ref(window.location.pathname)
function modalSearchOpen () {
  modalSearchValue.value = true
  searchQuery.value = ''
}
function pushLink (link:string) {
  router.push({
    name: link
  })
}
const PWAStore = usePWAStore()
const showValue = computed(() => PWAStore.showValue)
PWAStore.beforeInstall()
</script>
<template>
  <transition name="modal">
    <modal
      v-if="modalSearchValue"
      @close="modalSearchValue = false"
    >
      <div
        class="font-IRANSans px-16 h-600"
      >
        <div class="h-11 flex justify-center px-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="جستجو کنید ...."
            class="h-full rounded-r-full rounded-l-full pr-6 focus:outline-none focus:ring-4 ring-yellow-500 ring-opacity-50 font-IRANSans w-96"
          >
          <span
            class="z-30 h-full leading-snug font-normal text-center text-gray-500 rounded text-base flex items-center  justify-start w-12 pr-3 py-3 -mr-12"
          >
            <fa icon="search" />
          </span>
        </div>
        <div class="bg-blue-500 h-5/6 w-full grid items-center mt-10 overflow-y-scroll">
          <div v-if="searchQuery.length === 0">
            <p class="text-center text-2xl">
              چیزی تایپ کنید
            </p>
          </div>
          <div
            v-else
          >
            <div
              v-for="n in 50"
              :key="n"
              class="w-full bg-green-400 mb-2"
            >
              {{ n }}
            </div>
          </div>
        </div>
      </div>
    </modal>
  </transition>
  <transition name="modal">
    <modal
      v-if="modalGuideValue"
      @close="modalGuideValue = false"
    >
      <div class="grid font-IRANSans h-96 px-16">
        <p class="text-center font-extrabold text-4xl text-yellow-600">
          راهنما
        </p>
        <span class="w-full bg-black h-0.5" />
        <div class="text-xl">
          <p><span class="text-yellow-600">1.</span> اشتراک بین لهجه عراقی و خلیجی خیلی زیاد است و تنها در موارد کمی تفاوت وجود دارد. برخی از این تفاوت‌ها را در بخش «اصطلاحات خلیجی» می‌توانید بررسی کنید.</p>
          <p><span class="text-yellow-600">2.</span> دسته‌بندی‌های موجود به صورت مشترک بین لهجه عراقی و خلیجی می‌باشد.</p>
          <p><span class="text-yellow-600">3.</span> لغات نرم افزار به صورت آنلاین و مداوم بروزرسانی می‌شود.</p>
          <p><span class="text-yellow-600">4.</span>در صورتی که لغت مد نظر خود را جستجو کرده و پیدا نکردید، از بخش «درخواست ترجمه» می‌توانید آن را به اطّلاع ما برسانید تا نهایتاً پس از چند روز به دیکشنری اضافه شود.</p>
          <p>کلیه حقوق این نرم افزار متعلق به گروه آموزشی نبراس است و هر گونه کپی برداری از آن بدون ذکر منبع شرعاً و قانوناً ممنوع است.</p>
          <p class="text-center font-bold">
            با تشکر از همراهی شما.
          </p>
        </div>
      </div>
    </modal>
  </transition>
  <header class="w-full h-28 bg-white header ">
    <img
      src="../assets/logo.png"
      alt=""
      class="w-20 h-20 absolute left-16"
    >
    <div class="pointer  absolute right-20 text-center grid justify-center items-center">
      <p class="ghamoos font-IranNastaliq  text-4xl -mb-2">
        قاموس ٌ عربی ٌ
      </p>
    </div>
    <div class="font-IRANSans ">
      <div class="font-semibold text-2xl grid items-center justify-items-center ">
        <p class=" typing-demo">
          دیکشنری عربی نبراس
        </p>
      </div>
      <div class="text-lg grid items-center justify-items-center">
        <p class="typing-demo__accent">
          لهجه <span
            class="font-black text-yellow-500"
          >عراقی</span> و <span
            class="font-black text-yellow-500"
          >خلیجی</span>
        </p>
      </div>
    </div>
    <div class="font-IRANSans flex w-full justify-center mt-4 bg-yellow-500 h-10">
      <slot name="menu">
        <button
          v-if="pathName !== '/quiz/all'"
          class="btn-6 mx-4 w-36 nav-btn"
          @click="modalSearchOpen"
        >
          <span class="nav-span flex items-center justify-center"><fa icon="search" /><p class="mx-3">جستجو</p></span>
        </button>
        <button
          v-if="pathName !== '/'"
          class="btn-6 mx-4 w-36 nav-btn"
        >
          <router-link to="/">
            <span class="nav-span flex items-center justify-center"><fa icon="home" /><p class="mx-3">صفحه نخست</p></span>
          </router-link>
        </button>
        <button
          v-if="pathName !== '/login'"
          class="btn-6 mx-4 w-36 nav-btn"
          @click="pushLink('Login')"
        >
          <span class="nav-span flex items-center justify-center"><fa icon="user-tie" /><p class="mx-3">حساب کاربری</p></span>
        </button>
        <button class="btn-6 mx-4 w-36 nav-btn">
          <span class="nav-span flex items-center justify-center"><fa icon="wallet" /><p class="mx-3">نسخه طلایی</p></span>
        </button>
        <button
          v-if="pathName !== '/about-us'"
          class="btn-6 mx-4 w-36 nav-btn"
          @click="pushLink('AboutUs')"
        >
          <span class="nav-span flex items-center justify-center"><fa icon="address-card" /><p class="mx-3">درباره ما</p></span>
        </button>
        <button
          class="btn-6 mx-4 w-36 nav-btn"
          @click="modalGuideValue = true"
        >
          <span class="nav-span flex items-center justify-center"><fa icon="book" /><p class="mx-3">راهنما</p></span>
        </button>
        <button
          v-if="showValue"
          class="btn-6 mx-4 w-36 nav-btn"
          @click="PWAStore.showPromotion"
        >
          <span class="nav-span flex items-center justify-center"><fa icon="download" /><p class="mx-3">نصب برنامه</p></span>
        </button>
      </slot>
    </div>
  </header>
</template>
