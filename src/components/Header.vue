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
      <div class="header-modal__box">
        <button
          class="header-modal__button "
          @click="pushLink('Login')"
        >
          <p class="header-modal__text">
            <fa icon="user-tie" />
            حساب کاربری
          </p>
        </button>
        <span class="header-modal__line" />
        <button
          class="header-modal__button"
        >
          <p class="header-modal__text">
            <fa icon="wallet" />
            خرید نسخه طلایی
          </p>
        </button>
        <span class="header-modal__line" />
        <button
          class="header-modal__button "
          @click="pushLink('AboutUs')"
        >
          <p class="header-modal__text">
            <fa icon="address-card" />
            درباره ما
          </p>
        </button>
        <span class="header-modal__line" />
        <button
          class="header-modal__button"
          @click="openGuide"
        >
          <p class="header-modal__text">
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
      <div class="guide-box">
        <p class="guide__text__main">
          راهنما
        </p>
        <span class="guide-line" />
        <div>
          <p><span class="guide-number">1.</span> اشتراک بین لهجه عراقی و خلیجی خیلی زیاد است و تنها در موارد کمی تفاوت وجود دارد. برخی از این تفاوت‌ها را در بخش «اصطلاحات خلیجی» می‌توانید بررسی کنید.</p>
          <p><span class="guide-number">2.</span> دسته‌بندی‌های موجود به صورت مشترک بین لهجه عراقی و خلیجی می‌باشد.</p>
          <p><span class="guide-number">3.</span> لغات نرم افزار به صورت آنلاین و مداوم بروزرسانی می‌شود.</p>
          <p><span class="guide-number">4.</span>در صورتی که لغت مد نظر خود را جستجو کرده و پیدا نکردید، از بخش «درخواست ترجمه» می‌توانید آن را به اطّلاع ما برسانید تا نهایتاً پس از چند روز به دیکشنری اضافه شود.</p>
          <p>کلیه حقوق این نرم افزار متعلق به گروه آموزشی نبراس است و هر گونه کپی برداری از آن بدون ذکر منبع شرعاً و قانوناً ممنوع است.</p>
          <p class="text-center font-bold">
            با تشکر از همراهی شما.
          </p>
        </div>
      </div>
    </modal>
  </transition>
  <div
    class="header-box"
  >
    <span
      class="text-xl"
      @click="modalMenuValue = true"
    ><fa icon="align-justify" /></span>
    <div class="header-text__box">
      <p class="header-text__main">
        دیکشنری عربی نبراس
      </p>
      <p class="header-text__lahje">
        لهجه <span class="header-text__araghi"> عراقی</span> و
        <span class="header-text__khaliji">خلیجی</span>
      </p>
    </div>
    <img
      alt="Vue logo"
      src="../assets/logo.png"
      class="h-12"
    >
  </div>
</template>
<style>
.header-modal__box{
  @apply grid gap-4 font-IRANSans
}
.header-modal__button{
  @apply bg-yellow-500
        rounded-md
        h-10
}
.header-modal__text{
 @apply flex items-center justify-center gap-3
}
.guide-number{
 @apply text-yellow-600
}
.header-text__araghi{
 @apply bg-yellow-300 rounded-lg px-1
}
.header-text__khaliji{
 @apply px-1 bg-yellow-300 rounded-lg
}
.header-text__lahje{
  @apply text-sm font-Yekan
}
.header-modal__line{
  @apply w-full bg-black h-0.5
}
.header-box{
  @apply grid grid-cols-4
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
}
.header-text__main{
  @apply text-base font-black font-IRANSans
}
.header-text__box{
  @apply grid items-center justify-items-center col-span-2
}
.guide__text__main{
  @apply text-center font-extrabold text-xl text-yellow-600
}
.guide-box{
  @apply grid gap-4 font-IRANSans
}
.guide-line{
  @apply w-full bg-black h-0.5
}
</style>
