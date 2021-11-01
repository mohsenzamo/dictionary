<script lang="ts" setup>
import { ref, watch } from 'vue'
import backHeader from '../components/BackHeader.vue'
import db, { Search, Words } from '../datasource/database/dexieDB'
import { useWordsDB } from '../datasource/database/wordsDB'
import Loader from '../components/Loader.vue'
// @ts-ignore
import backToTop from 'vue-backtotop'
import { useRouter } from 'vue-router'
import { useSearchDB } from '../datasource/database/searchDB'
import searchLoader from '../components/searchLoader.vue'
const props = defineProps<{
  title: string
  id: string
}>()
const loading = ref(true)
const resultW = ref<Words[] | null>(null)
const emptyBookmark = ref(false)
if (+props.id === -100) {
  emptyBookmark.value = true
  loading.value = false
} else {
  useWordsDB().wordsGet(+props.id)
    .then(r => {
      resultW.value = r
    }).finally(() => {
      loading.value = false
    })
}
const router = useRouter()
function pushLinkQuiz (id:number) {
  router.push({
    name: 'Quiz',
    params: {
      id: id
    }
  })
}
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
const findCat = ref<Search[]|null>(null)
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
  // findCat.value = await db.search.where('CategoryID').equals(+props.id).toArray()
  // const cats = findCat.value.map(word => word.CategoryID)
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
</script>

<template>
  <backHeader>
    {{ props.title }}
  </backHeader>

  <backToTop
    visibleoffset="400"
    bottom="50px"
    right="10px"
  >
    <button
      type="button"
      class="w-8 h-8 rounded-md bg-yellow-500"
    >
      <fa
        icon="arrow-up"
        class="text-gray-700"
      />
    </button>
  </backToTop>
  <Loader v-if="loading" />
  <div
    v-else
  >
    <div
      v-if="emptyBookmark"
      class="list-box"
    >
      emptyBookmark
    </div>
    <template v-else>
      <!-----------------------------------search--------------------------------------->
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
      <transition
        name="page"
        mode="out-in"
      >
        <div>
          <div
            v-if="searchQuery.length>0"
            class="grid grid-rows-9 gap-x-8 gap-y-2 justify-items-stretch w-screen mt h-full mt-28 mb-16"
          >
            <searchLoader v-if="searchLoading" />
            <!--------------------------------------- find ---------------------------------------------->
            <template
              v-if="searchFind"
              class="mt-20"
            >
              <transition-group
                name="list"
              >
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
              </transition-group>
              <!-------------------empty--------------------------->
              <div
                ref="emptyDiv"
                class="grid w-screen items-center justify-items-center"
              >
                <sapn
                  v-if="listLoading"
                  class="list-loading"
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
            class="list-box"
          >
            <div
              v-for="item in resultW"
              :key="item.WordID"
              class="word-box"
            >
              <div class="word-box__main">
                <div class="font-semibold text-base">
                  {{ item.Ar }}
                </div>
                <div class="font-light text-sm">
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
              <div class="word-box__abilities">
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
          </div>
        </div>
      </transition>
    </template>
    <div
      class=" yellow-button__box"
    >
      <button
        class="yellow-button"
        @click="pushLinkQuiz(+props.id)"
      >
        <fa icon="pencil-alt" />
        <p>تمرین لغات</p>
        <span>/</span>
        <p>{{ props.title }}</p>
      </button>
    </div>
  </div>
</template>
<style>
.word-box{
  @apply bg-gray-100 even:bg-gray-300 row-span-1 rounded-lg mx-2 pr-4 font-IRANSans;
}
.list-box{
  @apply grid h-auto bg-gray-200 pt-28 gap-x-8 gap-y-2 justify-items-stretch mb-24;
}
.word-box__main{
  @apply w-40 h-auto float-right rounded-lg grid grid-rows-2 items-center;
}
.word-box__abilities{
  @apply w-24 h-14 float-left grid grid-cols-2 justify-items-center items-center;
}
.yellow-button__box{
  @apply w-screen
      fixed
      inset-x-0
      bottom-0
      h-12
      font-IRANSans
      grid
}
.yellow-button{
  @apply bg-yellow-500
        flex
        items-center
        justify-center
        rounded-t-2xl
        gap-x-3
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
  @apply bg-gray-200 h-screen w-screen text-center animate-opacity pt-20
}
.not-find__text{
  @apply font-IRANSans pt-16 text-xl
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

.list-loading {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  color: orange;
  left: -100px;
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
</style>
