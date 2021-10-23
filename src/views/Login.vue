<script lang="ts" setup>
import { ref } from 'vue'
import backHeader from '../components/BackHeader.vue'
const formValue = ref(true)
</script>
<template>
  <backHeader>
    صفحه ورود
  </backHeader>
  <div class="login-page">
    <transition
      name="scaleRight"
      appear
    >
      <div
        v-if="formValue"
        class="login-form"
      >
        <form class="w-full">
          <div class="relative mb-11">
            <input
              type="text"
              required
              class="login-form__input"
            >
            <label class="login-form__input-label">نام کاربری</label>
            <span class="focus-border" />
          </div>
          <div class="relative mb-11 w-full">
            <input
              type="text"
              required
              class="login-form__input"
            >
            <label class="login-form__input-label">ایمیل</label>
            <span class="focus-border" />
          </div>
          <div class="relative mb-11 w-full">
            <input
              type="text"
              required
              class="login-form__input"
            >
            <label class="login-form__input-label">پسورد</label>
            <span class="focus-border" />
          </div>
          <button
            type="button"
            class="login-btn"
          >
            ثبت نام
          </button>
        </form>
        <p class="mt-4 font-IRANSans text-xs">
          حساب کاربری دارید!
          <span
            class="go-to-login"
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
        class="sign-up-form"
      >
        <form class="w-full">
          <div class="relative mb-11">
            <input
              type="text"
              required
              class="sign-up-form__input"
            >
            <label class="sign-up-form__input-label">نام کاربری</label>
            <span class="focus-border" />
          </div>
          <div class="relative mb-11 w-full">
            <input
              type="text"
              required
              class="sign-up-form__input"
            >
            <label class="sign-up-form__input-label">پسورد</label>
            <span class="focus-border" />
          </div>
          <button
            type="button"
            class="sign-up-btn"
          >
            ورود
          </button>
        </form>
        <p class="mt-4 font-IRANSans text-xs">
          حساب کاربری ندارید؟
          <span
            class="go-to-sign-up"
            @click="formValue = !formValue"
          >ثبت نام کنید</span>
        </p>
      </div>
    </transition>
  </div>
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
.login-page{
  @apply h-screen grid items-center justify-center
}
.login-form{
  @apply bg-white pt-9 pr-9 pl-9 pb-5 text-center w-80 rounded-2xl shadow-2xl
}
.login-form__input{
  @apply block w-full border-b-2 border-solid border-black focus:outline-none border-opacity-60
}
.login-form__input-label{
  @apply text-yellow-600 absolute pointer-events-none right-1 -top-2 transition-all text-lg opacity-60 font-IRANSans
}
.sign-up-form{
  @apply bg-white pt-9 pr-9 pl-9 pb-5 text-center w-80 rounded-2xl shadow-2xl
}
.sign-up-form__input{
  @apply block w-full border-b-2 border-solid border-black focus:outline-none  border-opacity-60
}
.sign-up-form__input-label{
  @apply text-yellow-600 absolute pointer-events-none right-1 -top-2 transition-all text-lg opacity-60 font-IRANSans
}
.login-btn{
  @apply bg-yellow-500 w-full h-10 font-IRANSans rounded-lg
}
.sign-up-btn{
  @apply bg-yellow-500 w-full h-10 font-IRANSans rounded-lg
}
.go-to-login{
  @apply text-blue-700 cursor-pointer
}
.go-to-sign-up{
  @apply text-blue-700 cursor-pointer
}
</style>
