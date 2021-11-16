<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Modal from '../components/Modal.vue'
import database from '../datasource/database/dexieDB'
import Loader from '../components/Loader.vue'
import { useMergeDataStore } from '../datasource/repository/dataMerging'
import searchLoader from '../components/searchLoader.vue'
import { useCategoryStore } from '../datasource/database/categoriesDB'
import { useHomeSearchStore } from '../datasource/repository/homeSearch'
import HeaderLarge from '../components/HeaderLarge.vue'
import HomeLarge from './HomeLarge.vue'
const MergeDataStore = useMergeDataStore()
const CategoryStore = useCategoryStore()
const HomeSearchStore = useHomeSearchStore()
const mediaMatcher = matchMedia('(max-width: 1024px)')
const laptopScreen = ref(mediaMatcher.matches)
mediaMatcher.addListener(() => {
  laptopScreen.value = !laptopScreen.value
})
CategoryStore.getCategory().then(r => {
  MergeDataStore.categroyArray = r
})
const loading = computed(() => !MergeDataStore.categroyArray || MergeDataStore.categroyArray.length === 0)
const router = useRouter()
function pushLinkList (link:string, param:string, id:number, lock:number) {
  if (lock === 1) {
    router.push({
      name: link,
      params: {
        title: param,
        id: id
      }
    })
  }
}
function pushLinkQuiz (id:string) {
  router.push({
    name: 'Quiz',
    params: {
      id: id
    }
  })
}
const modalPremiumValue = ref(false)
const foundInWordsTable = computed(() => HomeSearchStore.foundInWordsTable)
const isFound = computed(() => HomeSearchStore.isFound)
const searchLoading = computed(() => HomeSearchStore.searchLoading)
const searchQuery = ref('')
const observeLoading = computed(() => HomeSearchStore.observeLoading)
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0
}
const emptyDiv = ref<HTMLDivElement>()
const isObserve = computed(() => HomeSearchStore.isObserve)
const observer = new IntersectionObserver(async e => {
  if (e[0].intersectionRatio === 1) {
    HomeSearchStore.plusPage()
  }
}, options)
watch(searchQuery, (searchQuery) => {
  HomeSearchStore.search(searchQuery)
})
watch(isObserve, (isObserve) => {
  isObserve ? observer.observe(emptyDiv.value!) : observer.unobserve(emptyDiv.value!)
})
async function bookmarkSelect (WordID:number) {
  const getWord = await database.words.where('WordID').equals(WordID).toArray()
  if (getWord[0].bookmark === 0) {
    getWord[0].bookmark = 1
    if (foundInWordsTable.value) {
      for (let i = 0; i < foundInWordsTable.value.length; i++) {
        if (foundInWordsTable.value[i].WordID === WordID) {
          foundInWordsTable.value[i].bookmark = 1
        }
      }
    }
  } else {
    getWord[0].bookmark = 0
    if (foundInWordsTable.value) {
      for (let i = 0; i < foundInWordsTable.value.length; i++) {
        if (foundInWordsTable.value[i].WordID === WordID) {
          foundInWordsTable.value[i].bookmark = 0
        }
      }
    }
  }
  database.words.put(getWord[0])
}
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
</script>

<template>
  <Header v-if="laptopScreen" />
  <HeaderLarge v-else />
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
        bg-yellow-500 rounded-md h-8
      "
        >
          <p>ارتقا به نسخه طلایی</p>
        </button>
      </div>
    </modal>
  </transition>
  <transition name="modal">
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
  </transition>
  <Loader v-if="loading" />
  <div v-else>
    <div v-if="laptopScreen">
      <div class="h-full pt-16">
        <div class="h-11 flex fixed top-16 z-10  w-full justify-center px-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="جستجو کنید ...."
            class="h-full rounded-r-full rounded-l-full pr-6 focus:outline-none focus:ring-4 ring-yellow-500 ring-opacity-50 font-IRANSans w-80 z-20"
          >
          <span
            class="z-30 h-full leading-snug font-normal text-center text-gray-500 rounded text-base flex items-center  justify-start w-12 pr-3 py-3 -mr-12"
          >
            <fa icon="search" />
          </span>
        </div>
        <!-- ------------------------------------- searchedWords ---------------------------------------------->
        <transition
          name="page"
          mode="out-in"
        >
          <div>
            <div
              v-if="searchQuery.length>0"
              class="grid grid-rows-9 gap-x-8 gap-y-2 justify-items-stretch w-full mt h-full mt-14 mb-16"
            >
              <searchLoader v-if="searchLoading" />
              <!--------------------------------------- find ---------------------------------------------->
              <template v-if="isFound">
                <transition-group
                  name="list"
                >
                  <div
                    v-for="item in foundInWordsTable"
                    :key="item.WordID"
                    class="bg-gray-100 even:bg-gray-300 row-span-1 rounded-lg animate-opacity mx-2 pr-4"
                  >
                    <div class="w-40 h-auto float-right rounded-lg grid items-center font-IRANSans">
                      <div class="font-semibold  text-base">
                        {{ item.Ar }}
                      </div>
                      <div class="font-light  text-sm">
                        {{ item.Fa }}
                      </div>
                      <div
                        v-if="item.Example.length > 0"
                        class="flex text-xs text-gray-500"
                      >
                        <p>مثال: </p>
                        <p>{{ item.Example }}</p>
                      </div>
                    </div>
                    <div class="bg-transparent w-28 h-14 float-left rounded-lg grid grid-cols-2 justify-items-center items-center">
                      <transition
                        name="bookmarkButton"
                        mode="out-in"
                      >
                        <button
                          v-if="item.bookmark===0"
                          type="submit"
                          class="w-5 h-5"
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
                          class="w-5 h-5"
                          @click="bookmarkSelect(item.WordID)"
                        >
                          <fa
                            icon="bookmark"
                            class="text-xl text-green-500"
                          />
                        </button>
                      </transition>
                      <button
                        v-if="item.SoundVersion===1"
                        @click="play(item.WordID)"
                      >
                        <fa
                          icon="volume-up"
                          class="active:text-xl"
                          :class="{'text-blue-500': playingId === item.WordID}"
                        />
                      </button>
                    </div>
                  </div>
                </transition-group>
                <!-------------------empty--------------------------->
                <div
                  ref="emptyDiv"
                  class="grid w-full items-center justify-items-center"
                >
                  <span
                    v-if="observeLoading"
                    class="list-loading"
                  />
                </div>
              </template>
              <!--------------------------------------- find ---------------------------------------------->
              <!--------------------------------------- not find ---------------------------------------------->

              <div
                v-else
                class="bg-gray-200 h-screen w-full text-center animate-opacity"
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

              <!--------------------------------------- not find ---------------------------------------------->
            </div>
            <div
              v-if="searchQuery.length<=0"
              class="h-full flex flex-wrap justify-center mt-14 mb-16 animate-opacity"
            >
              <div
                class="h-24 w-24 bg-gray-300 rounded-3xl grid justify-items-center items-center text-sm text-center font-IRANSans py-3 relative  cursor-pointer m-1 xsm:m-2;"
                @click="pushLinkList('List','نشان شده ها',-100,1)"
              >
                <div
                  class="w-8 h-8"
                >
                  <svg
                    id="Layer_1"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 280.028 280.028"
                    style="enable-background:new 0 0 280.028 280.028;"
                    xml:space="preserve"
                  >
                    <g>
                      <path
                        style="fill:#E2574C;"
                        d="M52.506,0h175.017c9.661,0,17.502,7.832,17.502,17.502v245.024c0,10.212-7.71,17.502-17.502,17.502
      c-8.191,0-70.269-38.81-78.758-43.754c-8.497-4.944-8.628-5.233-17.502,0c-8.873,5.259-70.409,43.754-78.758,43.754
      c-9.915,0-17.502-7.027-17.502-17.502V17.502C35.004,7.832,42.845,0,52.506,0z"
                      />
                      <path
                        style="fill:#CB4E44;"
                        d="M227.523,0h-87.509v232.466c2.258-0.018,4.419,1.278,8.751,3.807
      c8.453,4.927,70.086,43.448,78.618,43.728h0.411c9.661-0.14,17.23-7.359,17.23-17.475V17.502C245.025,7.832,237.184,0,227.523,0z"
                      />
                      <path
                        style="fill:#EFC75E;"
                        d="M210.048,105.395l-46.038-3.404l-23.995-49.486l-24.266,49.486l-45.758,3.404l30.628,38.197
      l-8.751,48.9l48.147-22.507l48.147,22.507l-8.908-48.9C179.253,143.593,210.048,105.395,210.048,105.395z"
                      />
                      <polygon
                        style="fill:#D7B354;"
                        points="188.162,192.501 179.253,143.602 210.048,105.395 164.009,101.991 140.015,52.505
      140.015,170.003 	"
                      />
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
                </div>
                <p>نشان شده ها</p>
              </div>
              <div
                v-for="item in MergeDataStore.categroyArray"
                :key="item.CategoryID"
                class="h-24 w-24 bg-gray-300 rounded-3xl grid justify-items-center items-center text-sm text-center font-IRANSans py-3 relative  cursor-pointer m-1 xsm:m-2;"
                @click="pushLinkList('List',item.Title,item.CategoryID,item.IsFree)"
              >
                <div
                  v-if="item.IsFree === 0"
                  class="absolute bg-gray-600 w-full h-full rounded-3xl opacity-50 cursor-not-allowed"
                  @click="modalPremiumValue = true"
                >
                  <fa
                    icon="lock"
                    class="absolute top-2 right-2 text-yellow-500"
                  />
                </div>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div
                  v-if="item.Icon"
                  class="w-8 h-8"
                  v-html="item.Icon"
                />
                <p>{{ item.Title }}</p>
              </div>
            </div>
          </div>
        </transition>
      <!--------------------------------------- searchedWords -------------------------------------------- -->
      </div>
      <audio
        v-if="playingId !== -1"
        :key="playingId"
        :src="audioSrc"
        autoplay
        @error="audioError"
        @ended="playingId = -1"
      />
      <div
        class="w-full fixed inset-x-0 bottom-0 h-12 grid grid-cols-2 font-IRANSans gap-x-2"
      >
        <button
          class="bg-yellow-500 flex items-center justify-center rounded-t-2xl gap-x-3"
          @click="pushLinkQuiz('all')"
        >
          <fa icon="pencil-alt" />
          <p>تمرین لغات</p>
        </button>
        <button
          class="bg-yellow-500 flex items-center justify-center rounded-t-2xl gap-x-3"
        >
          <fa icon="spell-check" />
          <p>آزمون مرحله ای</p>
        </button>
      </div>
    </div>
    <HomeLarge v-else />
  </div>
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
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
