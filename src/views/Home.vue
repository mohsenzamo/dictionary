<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Modal from '../components/Modal.vue'
import db, { Search, Words } from '../datasource/database/dexieDB'
import Loader from '../components/Loader.vue'
import { useCreateRepo } from '../datasource/repository/repo'
import { useSearchDB } from '../datasource/database/searchDB'
import searchLoader from '../components/searchLoader.vue'
import { useCategoriesDB } from '../datasource/database/categoriesDB'

useCategoriesDB().categoriesGet().then(r => {
  useCreateRepo().categroyTable = r
})
const loading = computed(() => !categoryRepo.categroyTable || categoryRepo.categroyTable.length === 0)

const categoryRepo = useCreateRepo()
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
const words = ref<Words[]|null>(null)
const searchFind = ref(true)
const searchLoading = ref(false)
const searchQuery = ref('')
const listLoading = ref(false)
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0
}
const emptyDiv = ref<HTMLDivElement>()
const findList = ref<Search[]|null>(null)
const page = ref(0)
const observer = new IntersectionObserver(async e => {
  if (e[0].intersectionRatio === 1) {
    page.value++
    console.log(page.value)
    const ids = findList.value!.map(word => word.WordID)
    const wordArray = await db.words
      .where('WordID')
      .anyOf(ids)
      .offset(page.value * 10)
      .limit(10)
      .toArray()
    if (wordArray.length < 10) {
      listLoading.value = false
      observer.unobserve(emptyDiv.value!)
    }
    words.value = words.value!.concat(wordArray)
  }
}, options)
async function search () {
  page.value = 0
  searchFind.value = true
  words.value = null
  searchLoading.value = true
  listLoading.value = false
  console.log(useSearchDB().normalizeAr(searchQuery.value))
  findList.value = await db.search
    .where('Word')
    .startsWith(useSearchDB().normalizeAr(searchQuery.value))
    .toArray()
  const ids = findList.value.map(word => word.WordID)
  words.value = await db.words
    .where('WordID')
    .anyOf(ids)
    .limit(10)
    .toArray()
  searchLoading.value = false
  if (words.value.length < 10) {
    listLoading.value = false
    observer.unobserve(emptyDiv.value!)
  } else {
    listLoading.value = true
    observer.observe(emptyDiv.value!)
  }
  if (words.value.length === 0) {
    listLoading.value = false
    searchFind.value = false
  }
}
watch(searchQuery, search)
// -----------------------------------search---------------------------------------

// -----------------------------------search---------------------------------------

</script>

<template>
  <Header />
  <transition name="modal">
    <modal
      v-if="modalPremiumValue"
      @close="modalPremiumValue = false"
    >
      <div class="premium-modal__box">
        <p class="">
          برای استفاده از این قسمت باید نرم افزار را به نسخه طلایی ارتقا دهید.<br>با دریافت نسخه طلایی نرم افزار، امکان دسترسی به هزاران لغت در دسته بندی های مختلف را خواهید داشت.
        </p>
        <button
          class="
        premium-modal__btn
      "
        >
          <p>ارتقا به نسخه طلایی</p>
        </button>
      </div>
    </modal>
  </transition>
  <Loader v-if="loading" />
  <div v-else>
    <div class="h-full pt-16">
      <div class="input-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="جستجو کنید ...."
          class="search-input"
        >
        <span
          class="search-input__submit"
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
            class="grid grid-rows-9 gap-x-8 gap-y-2 justify-items-stretch w-screen mt h-full mt-14 mb-16"
          >
            <searchLoader v-if="searchLoading" />
            <!--------------------------------------- find ---------------------------------------------->
            <template v-if="searchFind">
              <div
                v-for="item in words"
                :key="item.WordID"
                class="find-box"
              >
                <div class="find-word__main">
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
                <div class="find-word__abilities">
                  <!-- <fa
          icon="bookmark"
          class="text-xl text-green-500"
        /> -->
                  <span class="w-5 h-5">
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
                  </span>
                  <fa
                    icon="volume-up"
                    class="active:text-xl active:text-blue-500"
                  />
                </div>
              </div>
              <!-------------------empty--------------------------->
              <div
                ref="emptyDiv"
                class="grid w-screen items-center justify-items-center"
              >
                <sapn
                  v-if="listLoading"
                  class="loader-43"
                />
              </div>
            </template>
            <!--------------------------------------- find ---------------------------------------------->
            <!--------------------------------------- not find ---------------------------------------------->

            <div
              v-else
              class="not-find-box"
            >
              <p class="not-find__text">
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
            class="home-box"
          >
            <div
              class="category-box"
              @click="pushLinkList('List','نشان شده ها',-100,1)"
            >
              <div
                class="category-box__svg"
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
              v-for="item in categoryRepo.categroyTable"
              :key="item.CategoryID"
              class="category-box"
              @click="pushLinkList('List',item.Title,item.CategoryID,item.IsFree)"
            >
              <div
                v-if="item.IsFree === 0"
                class="premium"
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
                class="category-box__svg"
                v-html="item.Icon"
              />
              <p>{{ item.Title }}</p>
            </div>
          </div>
        </div>
      </transition>
    <!--------------------------------------- searchedWords -------------------------------------------- -->
    </div>

    <div
      class="
      yellow-btns-box"
    >
      <button
        class="
        yellow-btns
      "
        @click="pushLinkQuiz('all')"
      >
        <fa icon="pencil-alt" />
        <p>تمرین لغات</p>
      </button>
      <button
        class="
        yellow-btns
      "
      >
        <fa icon="spell-check" />
        <p>آزمون مرحله ای</p>
      </button>
    </div>
  </div>
</template>
<style>

.loader-43 {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  color: orange;
  left: -100px;
  -webkit-animation: shadowRolling 2s linear infinite;
          animation: shadowRolling 2s linear infinite;
}
@keyframes shadowRolling {
  0% {
    box-shadow: 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
  }
  12% {
    box-shadow: 100px 0 orange, 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
  }
  25% {
    box-shadow: 110px 0 orange, 100px 0 orange, 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
  }
  36% {
    box-shadow: 120px 0 orange, 110px 0 orange, 100px 0 orange, 0px 0 rgba(255, 255, 255, 0);
  }
  50% {
    box-shadow: 130px 0 orange, 120px 0 orange, 110px 0 orange, 100px 0 orange;
  }
  62% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 130px 0 orange, 120px 0 orange, 110px 0 orange;
  }
  75% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 130px 0 orange, 120px 0 orange;
  }
  87% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 130px 0 orange;
  }
  100% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0);
  }
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
.premium-modal__box{
  @apply grid font-IRANSans text-sm gap-4
}
.premium-modal__btn{
  @apply bg-yellow-500 rounded-md h-8
}
.input-box{
  @apply h-11 flex fixed top-16 z-10  w-screen justify-center px-2
}
.search-input{
  @apply h-full rounded-r-full rounded-l-full pr-6 focus:outline-none focus:ring-4 ring-yellow-500 ring-opacity-50 font-IRANSans w-80 z-20
}
.search-input__submit{
  @apply z-30 h-full leading-snug font-normal text-center text-gray-500 rounded text-base flex items-center  justify-start w-12 pr-3 py-3 -mr-12
}
.find-box{
  @apply bg-gray-100 even:bg-gray-300 row-span-1 rounded-lg animate-opacity mx-2 pr-4
}
.find-word__main{
  @apply w-40 h-auto float-right rounded-lg grid items-center font-IRANSans
}
.find-word__abilities{
  @apply bg-transparent w-28 h-14 float-left rounded-lg grid grid-cols-2 justify-items-center items-center
}
.not-find-box{
  @apply bg-gray-200 h-screen w-screen text-center animate-opacity
}
.not-find__text{
  @apply font-IRANSans pt-16 text-xl
}
.home-box{
  @apply h-full flex flex-wrap gap-2 justify-center mt-14 mb-16 animate-opacity xsm:gap-4
}
.premium{
  @apply absolute bg-gray-600 w-full h-full rounded-3xl opacity-50 cursor-not-allowed
}
  .category-box {
    @apply h-24 w-24 bg-gray-300 rounded-3xl grid justify-items-center items-center text-sm text-center font-IRANSans py-3 relative  cursor-pointer;
  }
.category-box__svg{
  @apply w-8 h-8
}
.category-box__svg svg{
  width: 100% !important;
  height: 100% !important;
}
/* .category-box__svg svg path{
  fill: red;
} */
.yellow-btns-box{
  @apply w-screen
      fixed
      inset-x-0
      bottom-0
      h-12
      grid grid-cols-2
      font-IRANSans
      gap-x-2

}
.yellow-btns{
  @apply bg-yellow-500
        flex
        items-center
        justify-center
        rounded-t-2xl
        gap-x-3
}
</style>
