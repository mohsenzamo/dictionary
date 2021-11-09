<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import Modal from '../components/Modal.vue'
import Loader from '../components/Loader.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const modalSearchValue = ref(false)
const modalGuideValue = ref(false)
const searchQuery = ref('')
const pathName = ref(window.location.pathname)
function modalSearchOpen () {
  modalSearchValue.value = true
  searchQuery.value = ''
}
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
    <div class="pointer  absolute right-10 text-center grid justify-center items-center">
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
      <button
        class="btn-6 mx-4 w-36 nav-btn"
        @click="modalSearchOpen"
      >
        <span class="nav-span flex items-center justify-center"><fa icon="search" /><p class="mx-3">جستجو</p></span>
      </button>
      <button
        v-if="pathName !== '/homelarge'"
        class="btn-6 mx-4 w-36 nav-btn"
      >
        <span class="nav-span flex items-center justify-center"><fa icon="home" /><p class="mx-3">صفحه نخست</p></span>
      </button>
      <button class="btn-6 mx-4 w-36 nav-btn">
        <span class="nav-span flex items-center justify-center"><fa icon="user-tie" /><p class="mx-3">حساب کاربری</p></span>
      </button>
      <button class="btn-6 mx-4 w-36 nav-btn">
        <span class="nav-span flex items-center justify-center"><fa icon="wallet" /><p class="mx-3">نسخه طلایی</p></span>
      </button>
      <button class="btn-6 mx-4 w-36 nav-btn">
        <span class="nav-span flex items-center justify-center"><fa icon="address-card" /><p class="mx-3">درباره ما</p></span>
      </button>
      <button
        class="btn-6 mx-4 w-36 nav-btn"
        @click="modalGuideValue = true"
      >
        <span class="nav-span flex items-center justify-center"><fa icon="book" /><p class="mx-3">راهنما</p></span>
      </button>
    </div>
  </header>
</template>
<style>
.typing-demo {
  animation: typing 2s steps(22), blink .5s step-end infinite alternate;
  width: 210px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
}
.typing-demo__accent {
  animation: typing 4s steps(30), blink .5s step-end infinite alternate;
  width: 210px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
}

@keyframes typing {
  from {
    width: 0
  }
}

@keyframes blink {
  50% {
    border-color: transparent
  }
}

.nav-btn{
  display: inline-block;
  position: relative;
  border: none;
  padding-left: 5px;
  padding-right: 5px;
}
.nav-btn::before, .nav-btn::after{
  content:"";
  width: 0;
  height: 2px;
  position: absolute;
  transition: all 0.1s linear;
  background: rgb(17,117,139);
}
.nav-span::before, .nav-span::after{
  content:"";
  width:2px;
  height:0;
  position: absolute;
  transition: all 0.1s linear;
  background: rgb(17,117,139);
}
.nav-btn:hover::before, .nav-btn:hover::after{
  width: 100%;
}
.nav-btn:hover .nav-span::before, .nav-btn:hover .nav-span::after{
  height: 100%;
}
.btn-6::before{
  left: 50%;
  top: 0;
  transition-duration: 0.3s;
}
.btn-6::after{
  left: 50%;
  bottom: 0;
  transition-duration: 0.3s;
}
.btn-6 .nav-span::before{
  left: 0;
  top: 50%;
  transition-duration: 0.3s;
}
.btn-6 .nav-span::after{
  right: 0;
  top: 50%;
  transition-duration: 0.3s;
}
.btn-6:hover::before, .btn-6:hover::after{
  left: 0;
}
.btn-6:hover .nav-span::before, .btn-6:hover .nav-span::after{
  top: 0;
}
.pointer {
  width: 200px;
  height: 40px;
  top: 20px;
  background: rgb(17,117,139);
    animation: float 4s infinite;

}
.pointer:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 20px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
.pointer:before {
  content: "";
  position: absolute;
  right: -20px;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 20px solid rgb(17,117,139);
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
.ghamoos{
    transform: rotate(180deg);
}
@keyframes float {
  0%{
   transform:  translateY(0px) rotate(180deg);
  }
  50%{
   transform:  translateY(5px) rotate(180deg);
  }
  100%{
   transform:  translateY(0px) rotate(180deg);
  }

}
.header{
        box-shadow: rgb(245,158,11, 0.4) 0px 5px, rgba(245,158,11, 0.3) 0px 10px, rgba(245,158,11, 0.2) 0px 15px, rgba(245,158,11, 0.1) 0px 20px, rgba(245,158,11, 0.05) 0px 30px;
}
</style>
