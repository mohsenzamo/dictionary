<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import Modal from '../components/Modal.vue'
import { useRouter } from 'vue-router'
import { useListSearchRepo } from '../datasource/repository/listSearchRepo'
import db, { Words } from '../datasource/database/dexieDB'
import { useWordsDB } from '../datasource/database/wordsDB'
import { useCategoriesDB } from '../datasource/database/categoriesDB'
import { useCreateRepo } from '../datasource/repository/repo'
import { useHomeLargeSearchRepo } from '../datasource/repository/homeLargeSearchRepo'
import SearchLoader from './searchLoader.vue'
import { usePWAStore } from '../datasource/repository/PWA'
import { useSearchDB } from '../datasource/database/searchDB'
const HomeSearchRepo = useHomeLargeSearchRepo()
const words = computed(() => HomeSearchRepo.words)
const searchFind = computed(() => HomeSearchRepo.searchFind)
const searchLoading = computed(() => HomeSearchRepo.searchLoading)
const searchQuerylg = ref('')
// const options = {
//   root: null,
//   rootMargin: '0px',
//   threshold: 1.0
// }
// const emptyDiv1 = ref<HTMLDivElement>()
// const observeValue = computed(() => HomeSearchRepo.observeValue)
// console.log(observeValue.value)
// watch(observeValue, (observeValue) => {
//   if (observeValue === true) {
//     const tem = document.getElementById('emt')
//     console.log(tem)
//   }
// })
// const observer1 = new IntersectionObserver(async e => {
//   if (e[0].intersectionRatio === 1) {
//     // useHomeSearchRepo().pages()
//     console.log('sss')
//   }
// }, options)
// watch(observeValue, (observeValue) => {
//   if (observeValue === true) {
//     const tem = document.getElementById('emt')
//     console.log(tem)
//     observer1.observe(tem!)
//   } else {
//     const tem = document.getElementById('emt')
//     console.log(tem)
//     observer1.unobserve(tem!)
//   }
// })
watch(searchQuerylg, (searchQuerylg) => {
  HomeSearchRepo.search(searchQuerylg, searchCat.value, searchSub.value)
})
const categoryRepo = useCreateRepo()
useCategoriesDB().categoriesGet().then(r => {
  categoryRepo.categroyTable = r
})
const router = useRouter()
const modalSearchValue = ref(false)
const modalGuideValue = ref(false)
const pathName = ref(window.location.pathname)
const searchSub = ref('1')
function modalSearchOpen () {
  modalSearchValue.value = true
  searchSub.value = '1'
  searchQuerylg.value = ''
}
function pushLink (link:string) {
  router.push({
    name: link
  })
}
const PWAStore = usePWAStore()
const showValue = computed(() => PWAStore.showValue)
PWAStore.beforeInstall()
const audioSrc = ref('')
const playingId = ref(-1)
const modalErrorValue = ref(false)
function play (id:number) {
  playingId.value = id
  audioSrc.value = `https://nebrasar.ir/sounds/${id}.m4a`
}
function audioError () {
  playingId.value = -1
  modalErrorValue.value = true
}
async function bookmarkSelect (WordID:number) {
  const getWord = await db.words.where('WordID').equals(WordID).toArray()
  if (getWord[0].bookmark === 0) {
    getWord[0].bookmark = 1
    for (let i = 0; i < words.value!.length; i++) {
      if (words.value![i].WordID === WordID) {
        words.value![i].bookmark = 1
      }
    }
    if (words.value) {
      for (let i = 0; i < words.value.length; i++) {
        if (words.value[i].WordID === WordID) {
          words.value[i].bookmark = 1
        }
      }
    }
  } else {
    getWord[0].bookmark = 0
    for (let i = 0; i < words.value!.length; i++) {
      if (words.value![i].WordID === WordID) {
        words.value![i].bookmark = 0
      }
    }
    if (words.value) {
      for (let i = 0; i < words.value.length; i++) {
        if (words.value[i].WordID === WordID) {
          words.value[i].bookmark = 0
        }
      }
    }
  }
  await db.words.put(getWord[0])
  await useSearchDB().createSearchArray2(WordID)
}
const searchCat = ref(-10)
watch(searchCat, () => {
  searchQuerylg.value = ''
})
watch(searchSub, () => {
  searchQuerylg.value = ''
})
</script>
<template>
  <audio
    v-if="playingId !== -1"
    :key="playingId"
    :src="audioSrc"
    autoplay
    @error="audioError"
    @ended="playingId = -1"
  />
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
            v-model="searchQuerylg"
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
        <div class="flex justify-center items-center mt-4 gap-x-8 flex-wrap">
          <label class="cursor-pointer search-sub__label">همه
            <input
              v-model="searchSub"
              value="1"
              class="cursor-pointer invisible"
              type="radio"
              name="search-sub"
              checked
            >
            <span class="bg-yellow-500 rounded-full search-sub__span right-7" />
          </label>
          <label class="cursor-pointer search-sub__label">نشان شده ها
            <input
              v-model="searchSub"
              value="2"
              class="cursor-pointer invisible"
              type="radio"
              name="search-sub"
            >
            <span
              class="bg-yellow-500 rounded-full search-sub__span"
              style="right: 88px;"
            />
          </label>
          <label class="cursor-pointer search-sub__label">دسته بندی خاص
            <input
              v-model="searchSub"
              value="3"
              class="cursor-pointer invisible"
              type="radio"
              name="search-sub"
            >
            <span
              class="bg-yellow-500 rounded-full search-sub__span "
              style="right: 112px;"
            />
          </label>
          <div
            v-if="searchSub==='3'"
            class="select mt-3"
          >
            <select
              v-model="searchCat"
              class="bg-gray-300 ring-4 ring-yellow-500 rounded-md outline-none"
            >
              <option
                v-for="cats in useCreateRepo().categroyTable"
                :key="cats.CategoryID"
                :value="cats.CategoryID"
                :disabled="cats.IsFree === 0"
              >
                {{ cats.Title }}
              </option>
            </select>
          </div>
        </div>
        <div
          class="bg-gray-200 h-5/6 w-full grid items-center mt-4 overflow-y-scroll rounded-md search-modal__scroll"
          :class="{'h-4/5': searchSub==='3'}"
        >
          <div v-if="searchQuerylg.length === 0">
            <p class="text-center text-2xl">
              برای نمایش نتایج حروف مورد نظر را وارد کنید
            </p>
          </div>
          <div
            v-else
            class="grid items-center justify-items-center"
          >
            <SearchLoader v-if="searchLoading" />
            <div
              v-if="searchFind"
              class="grid justify-items-center"
            >
              <div
                v-for="item in words"
                :key="item.WordID"
                class="bg-gray-100 even:bg-gray-300  rounded-lg font-IRANSans grid grid-cols-3 justify-center text-center items-center p-4 mt-4 w-11/12 word-box__shadow-lg  "
              >
                <div class="word-box__ability-bookmark-lg">
                  <div>
                    <transition
                      name="bookmarkButton"
                      mode="out-in"
                    >
                      <button
                        v-if="item.bookmark===0"
                        class="w-8 h-8"
                        type="submit"
                        @click="bookmarkSelect(item.WordID)"
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
                        v-else
                        type="submit"
                        @click="bookmarkSelect(item.WordID)"
                      >
                        <fa
                          icon="bookmark"
                          class="text-4xl text-green-500"
                        />
                      </button>
                    </transition>
                  </div>
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
                    <div v-if="item.SoundVersion===1">
                      <button
                        v-if="playingId === item.WordID"
                        type="submit"
                        class=" equalizer-play"
                        @click="play(item.WordID)"
                      />
                      <button
                        v-else
                        type="submit"
                        class=" equalizer bg-black"
                        @click="play(item.WordID)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div
                  id="emt"
                  ref="emptyDiv1"
                  class="grid w-full items-center justify-items-center my-4"
                >
                  <span
                    class="list-loading"
                  />
                </div> -->
            </div>
            <div
              v-else
              class="bg-gray-200 h-full w-full text-center animate-opacity"
            >
              <p class="font-IRANSans pt-16 text-xl">
                نتیجه ای یافت نشد!
              </p>
              <br>
              <fa
                icon="frown"
                style="color: rgba(245, 158, 11) ; font-size: 32px;"
                class="animate-spin"
              />
            </div>
          </div>
        </div>
      </div>
      <modal
        v-if="modalErrorValue"
        @close="modalErrorValue = false"
      >
        <div class="grid items-center justify-items-center">
          <p class="font-IRANSans w-2/3 text-center">
            لطفا اتصال به اینترنت رو چک کنین!
          </p>
          <fa
            icon="wifi"
            class="animate-pulse text-xl mt-3"
          />
        </div>
      </modal>
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
  <header class="w-full h-28 bg-white header fixed top-0 z-30 ">
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
<style>
.bookmarkButton-enter-active,
.bookmarkButton-leave-active {
  transition: all 0.5s ease;
}

.bookmarkButton-enter-from,
.bookmarkButton-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}
.search-sub__span {
  position: absolute;
  top: 0;

  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}
.search-sub__label{
  position: relative;
}
.search-sub__label:hover input ~ .search-sub__span {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.search-sub__label input:checked ~ .search-sub__span {
  @apply bg-yellow-500
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.search-sub__span:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.search-sub__label input:checked ~ .search-sub__span:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.search-sub__label .search-sub__span:after {
top: 9px;
	left: 9px;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: white;
}
.search-modal__scroll:-webkit-scrollbar-track {

  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;

}
</style>
