<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import Modal from '../components/Modal.vue'
import Loader from '../components/Loader.vue'
import { useRouter } from 'vue-router'
import { useListSearchRepo } from '../datasource/repository/listSearchRepo'
import db, { Words } from '../datasource/database/dexieDB'
import { useWordsDB } from '../datasource/database/wordsDB'
const router = useRouter()
const modalSearchValue = ref(false)
const modalGuideValue = ref(false)
const searchQuery = ref('')
const pathName = ref(window.location.pathname)
const searchFind = computed(() => useListSearchRepo().searchFind)
const props = defineProps<{
  id: string
}>()
const loading = ref(true)
const resultW = ref<Words[] | null>(null)
const emptyBookmark = ref(false)
useWordsDB().wordsGet(+props.id)
  .then(x => {
    resultW.value = x
  }).finally(() => {
    loading.value = false
  })
function modalSearchOpen () {
  modalSearchValue.value = true
  searchQuery.value = ''
}
function pushLink (link:string) {
  router.push({
    name: link
  })
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
            placeholder="جستجو ...."
            class="h-full rounded-r-full rounded-l-full pr-6 focus:outline-none focus:ring-4 ring-yellow-500 ring-opacity-50 font-IRANSans w-96"
          >
          <span
            class="z-30 h-full leading-snug font-normal text-center text-gray-500 rounded text-base flex items-center  justify-start w-12 pr-3 py-3 -mr-12"
          >
            <fa icon="search" />
          </span>
        </div>
        <div class="bg-gray-200 h-5/6 w-full grid items-center mt-10 overflow-y-scroll rounded-md search-modal__scroll">
          <div v-if="searchQuery.length === 0">
            <p class="text-center text-2xl">
              برای نمایش نتایج حروف مورد نظر را وارد کنید
            </p>
          </div>
          <div
            v-else
            class="grid items-center justify-items-center"
          >
            <div
              v-for="item in resultW"
              :key="item.WordID"
              class=" bg-gray-100 even:bg-gray-300  rounded-lg font-IRANSans grid grid-cols-3 justify-center text-center items-center p-4 mt-4 w-11/12 word-box__shadow-lg mb-2"
            >
              <div class="word-box__ability-bookmark-lg">
                <transition
                  name="bookmarkButton"
                  mode="out-in"
                >
                  <div>
                    <button
                      v-if="item.bookmark===0"
                      class="w-8 h-8"
                      type="submit"
                    >
                      <svg
                        id="Layer_1"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        style="enable-background:new 0 0 512 512;"
                        xml:space="preserve"
                      >
                        <g>
                          <g>
                            <path
                              d="M70.715,0v512L256,326.715L441.285,512V0H70.715z M411.239,439.462L256,284.224L100.761,439.462V30.046h310.477V439.462z"
                            />
                          </g>
                        </g>
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                      </svg>
                    </button>
                    <button
                      v-if="item.bookmark===1"
                      type="submit"
                      class=""
                    >
                      <fa
                        icon="bookmark"
                        class="text-4xl text-green-500"
                      />
                    </button>
                  </div>
                </transition>
              </div>
              <div class="word-box__main-content-lg">
                <div class="flex justify-center word-box__main-lg">
                  <p class="font-bold text-lg">
                    {{ item.Ar }}
                  </p> <p class="font-semibold">
                    &nbsp;:&nbsp;
                  </p> <P class="font-light text-lg">
                    {{ item.Fa }}
                  </P>
                </div>
                <div
                  v-if="item.Example.length > 0"
                  class="flex text-sm text-gray-700 justify-center word-box__exp-lg"
                >
                  <p>مثال: </p>
                  <p>{{ item.Example }}</p>
                </div>
              </div>
              <div class=" grid justify-items-center h-8 rotate-180">
                <div
                  class="word-box__ability-volume-lg"
                >
                  <button
                    v-if="item.SoundVersion===1"
                    type="submit"
                    class=" equalizer-search "
                    @click="play(item.WordID)"
                  />
                </div>
              </div>
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
        <router-link to="/homelarge">
          <span class="nav-span flex items-center justify-center"><fa icon="home" /><p class="mx-3">صفحه نخست</p></span>
        </router-link>
      </button>
      <button
        class="btn-6 mx-4 w-36 nav-btn"
        @click="pushLink('Login')"
      >
        <span class="nav-span flex items-center justify-center"><fa icon="user-tie" /><p class="mx-3">حساب کاربری</p></span>
      </button>
      <button class="btn-6 mx-4 w-36 nav-btn">
        <span class="nav-span flex items-center justify-center"><fa icon="wallet" /><p class="mx-3">نسخه طلایی</p></span>
      </button>
      <button
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
    </div>
  </header>
</template>
<style>
.search-modal__scroll:-webkit-scrollbar-track {

  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;

}
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
/* equalizer */
.equalizer-search {
  position: relative;
  left: 5px;
  display: block;
  width: 6px;
  background-color: black;
  height: 10px;
}

.equalizer-search,
.equalizer-search::before,
.equalizer-search::after {
  animation: equalize 1.25s steps(25, end) 0s infinite;

}

.equalizer-search::before,
.equalizer-search::after {
  content: '';
  position: absolute;
  left: 20px;
  height: 20px;
  width: 6px;
  top: 0;
  background-color: black;
}

.equalizer-search::before {
  animation-name: equalize2;
}

.equalizer-search::after {
  left: 10px;
  animation-name: equalize3;
}
/* @keyframes equalize {
  0% {
    height: 8px;
  }
  4% {
    height: 4px;
  }
  8% {
    height: 8px;
  }
  12% {
    height: 9px;
  }
  16% {
    height: 10px;
  }
  20% {
    height: 11px;
  }
  24% {
    height:10px;
  }
  28% {
    height: 9px;
  }
  32% {
    height: 9px;
  }
  36% {
    height: 8px;
  }
  40% {
    height: 8.5px;
  }
  44% {
    height: 8.5px;
  }
  48% {
    height: 9px;
  }
  52% {
    height: 10px;
  }
  56% {
    height: 11px;
  }
  60% {
    height: 10px;
  }
  64% {
    height: 10px;
  }
  68% {
    height: 9px;
  }
  72% {
    height: 8px;
  }
  76% {
    height: 9px;
  }
  80% {
    height: 11px;
  }
  84% {
    height: 11px;
  }
  88% {
    height: 12px;
  }
  92% {
    height: 10px;
  }
  96% {
    height: 8px;
  }
  100% {
    height: 4px;
  }
}
@keyframes equalize2 {
  0% {
    height:12px;
  }
  4% {
    height: 13px;
  }
  8% {
    height: 11px;
  }
  12% {
    height: 12px;
  }
  16% {
    height: 10px;
  }
  20% {
    height: 10px;
  }
  24% {
    height: 10px;
  }
  28% {
    height: 11px;
  }
  32% {
    height: 11px;
  }
  36% {
    height: 13px;
  }
  40% {
    height: 13px;
  }
  44% {
    height: 13px;
  }
  48% {
    height: 12px;
  }
  52% {
    height: 9px;
  }
  56% {
    height: 7px;
  }
  60% {
    height: 6px;
  }
  64% {
    height: 9px;
  }
  68% {
    height: 10px;
  }
  72% {
    height: 13px;
  }
  76% {
    height: 11px;
  }
  80% {
    height: 12px;
  }
  84% {
    height: 10px;
  }
  88% {
    height: 10px;
  }
  92% {
    height: 9px;
  }
  96% {
    height: 11px;
  }
  100% {
    height: 12px;
  }
}
 @keyframes equalize3 {
  0% {
    height: 9px;
  }
  4% {
    height: 7px;
  }
  8% {
    height: 10px;
  }
  12% {
    height: 11px;
  }
  16% {
    height: 13px;
  }
  20% {
    height: 15px;
  }
  24% {
    height: 14px;
  }
  28% {
    height: 13px;
  }
  32% {
    height: 12px;
  }
  36% {
    height: 10px;
  }
  40% {
    height: 7px;
  }
  44% {
    height: 5px;
  }
  48% {
    height: 8px;
  }
  52% {
    height: 10px;
  }
  56% {
    height: 12px;
  }
  60% {
    height: 13px;
  }
  64% {
    height: 13.5px;
  }
  68% {
    height: 13.5px;
  }
  72% {
    height: 13.5px;
  }
  76% {
    height: 11px;
  }
  80% {
    height: 12px;
  }
  84% {
    height: 13.5px;
  }
  88% {
    height: 15px;
  }
  92% {
    height: 14px;
  }
  96% {
    height: 12px;
  }
  100% {
    height: 10px;
  }
} */

</style>
