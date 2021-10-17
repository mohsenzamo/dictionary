<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store/index'
import Modal from '../components/Modal.vue'
const router = useRouter()
const store = useStore()
const modalMenuValue = ref(false)
const modalGuideValue = ref(false)
const login = ref('Login')
function pushLink (link:string) {
  router.push({
    name: link
  })
}
function openGuide () {
  modalGuideValue.value = true
  modalMenuValue.value = false
}
</script>
<template>
  <transition name="modal">
    <modal
      v-if="modalMenuValue"
      @close="modalMenuValue = false"
    >
      <div class="grid gap-4 font-IRANSans">
        <button
          class="
        bg-yellow-500
        rounded-md
        h-10
      "
          @click="pushLink('Login')"
        >
          <p class="flex items-center justify-center gap-3">
            <fa icon="user-tie" />
            حساب کاربری
          </p>
        </button>
        <span class="w-full bg-black h-0.5" />
        <button
          class="
        bg-yellow-500
        rounded-md
        h-10
      "
        >
          <p class="flex items-center justify-center gap-3">
            <fa icon="wallet" />
            خرید نسخه طلایی
          </p>
        </button>
        <span class="w-full bg-black h-0.5" />
        <button
          class="
        bg-yellow-500
        rounded-md
        h-10
      "
          @click="pushLink('AboutUs')"
        >
          <p class="flex items-center justify-center gap-3">
            <fa icon="address-card" />
            درباره ما
          </p>
        </button>
        <span class="w-full bg-black h-0.5" />
        <button
          class="
        bg-yellow-500
        rounded-md
        h-10
      "
          @click="openGuide"
        >
          <p class="flex items-center justify-center gap-3">
            <fa icon="book" />
            راهنما
          </p>
        </button>
      </div>
    </modal>
  </transition>
  <transition name="modal">
    <modal
      v-if="modalGuideValue"
      @close="modalGuideValue = false"
    >
      <div class="grid gap-4 font-IRANSans">
        <p class="text-center font-extrabold text-xl text-yellow-600">
          راهنما
        </p>
        <span class="w-full bg-black h-0.5" />
        <div>
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
  <div
    class="
      grid grid-cols-4
      items-center
      h-14
      justify-items-center
      header-shadow
      fixed
      w-screen
      bg-white
      inset-x-0
      top-0
      z-10
    "
  >
    <span
      class="text-xl"
      @click="modalMenuValue = true"
    ><fa icon="align-justify" /></span>
    <div class="grid items-center justify-items-center col-span-2">
      <p class="text-base font-black font-IRANSans">
        دیکشنری عربی نبراس
      </p>
      <p class="text-sm font-Yekan">
        لهجه <span class="bg-gray-300 rounded-lg px-1"> عراقی</span> و
        <span class="px-1 bg-gray-300 rounded-lg">خلیجی</span>
      </p>
    </div>
    <img
      alt="Vue logo"
      src="../assets/logo.png"
      class="h-12"
    >
  </div>
</template>
