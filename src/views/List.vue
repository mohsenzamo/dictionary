<script lang="ts" setup>
import HeaderLarge from '../components/HeaderLarge.vue'
import ListLarge from './ListLarge.vue'
import { computed, ref, watch } from 'vue'
import backHeader from '../components/BackHeader.vue'
import database, { wordType } from '../datasource/database/dexieDB'
import { useWordStore } from '../datasource/database/wordsDB'
import Loader from '../components/Loader.vue'
import { useRouter } from 'vue-router'
import searchLoader from '../components/searchLoader.vue'
import { useListSearchStore } from '../datasource/repository/listSearch'
import { useSearchStore } from '../datasource/database/searchDB'
import Modal from '../components/Modal.vue'
import { useStore } from '../store'
const Store = useStore()
const WordStore = useWordStore()
const ListSearchStore = useListSearchStore()
const SearchStore = useSearchStore()
const mediaMatcher = matchMedia('(max-width: 1024px)')
const laptopScreen = ref(mediaMatcher.matches)
mediaMatcher.addListener(() => {
  laptopScreen.value = !laptopScreen.value
})
const props = defineProps<{
  title: string
  id: string
}>()
Store.propId = +props.id
// eslint-disable-next-line vue/no-setup-props-destructure
Store.propTitle = props.title
const loading = ref(true)
const resultW = ref<wordType[] | null>(null)
const emptyBookmark = ref(false)
if (+props.id === -100) {
  emptyBookmark.value = true
  WordStore.getWord(+props.id)
    .then(r => {
      resultW.value = r
    }).finally(() => {
      loading.value = false
    })
} else {
  emptyBookmark.value = false
  WordStore.getWord(+props.id)
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
const foundInWordsTable = computed(() => ListSearchStore.foundInWordsTable)
const isFound = computed(() => ListSearchStore.isFound)
const searchLoading = computed(() => ListSearchStore.searchLoading)
const searchQuery = ref('')
const observeLoading = computed(() => ListSearchStore.observeLoading)
const isObserve = computed(() => ListSearchStore.isObserve)
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0
}
const emptyDiv = ref<HTMLDivElement>()
const observer = new IntersectionObserver(async e => {
  if (e[0].intersectionRatio === 1) {
    ListSearchStore.plusPage()
  }
}, options)
watch(searchQuery, (searchQuery) => {
  ListSearchStore.search(searchQuery, +props.id)
})
watch(isObserve, (isObserve) => {
  isObserve ? observer.observe(emptyDiv.value!) : observer.unobserve(emptyDiv.value!)
})
async function bookmarkSelect (WordID:number) {
  const getWord = await database.words.where('WordID').equals(WordID).toArray()
  if (getWord[0].bookmark === 0) {
    getWord[0].bookmark = 1
    for (let i = 0; i < resultW.value!.length; i++) {
      if (resultW.value![i].WordID === WordID) {
        resultW.value![i].bookmark = 1
      }
    }
    if (foundInWordsTable.value) {
      for (let i = 0; i < foundInWordsTable.value.length; i++) {
        if (foundInWordsTable.value[i].WordID === WordID) {
          foundInWordsTable.value[i].bookmark = 1
        }
      }
    }
  } else {
    getWord[0].bookmark = 0
    for (let i = 0; i < resultW.value!.length; i++) {
      if (resultW.value![i].WordID === WordID) {
        resultW.value![i].bookmark = 0
      }
    }
    if (foundInWordsTable.value) {
      for (let i = 0; i < foundInWordsTable.value.length; i++) {
        if (foundInWordsTable.value[i].WordID === WordID) {
          foundInWordsTable.value[i].bookmark = 0
        }
      }
    }
  }
  await database.words.put(getWord[0])
  await SearchStore.changeSearchBookmark(WordID)
}
async function bookmarkRemove (WordID:number) {
  const getWord = await database.words.where('WordID').equals(WordID).toArray()
  if (getWord[0].bookmark === 0) {
    getWord[0].bookmark = 1
    for (let i = 0; i < resultW.value!.length; i++) {
      if (resultW.value![i].WordID === WordID) {
        resultW.value![i].bookmark = 1
      }
    }
    if (foundInWordsTable.value) {
      for (let i = 0; i < foundInWordsTable.value.length; i++) {
        if (foundInWordsTable.value[i].WordID === WordID) {
          foundInWordsTable.value[i].bookmark = 1
        }
      }
    }
  } else {
    getWord[0].bookmark = 0
    for (let i = 0; i < resultW.value!.length; i++) {
      if (resultW.value![i].WordID === WordID) {
        resultW.value![i].bookmark = 0
        resultW.value!.splice(i, 1)
      }
    }
    if (foundInWordsTable.value) {
      for (let i = 0; i < foundInWordsTable.value.length; i++) {
        if (foundInWordsTable.value[i].WordID === WordID) {
          foundInWordsTable.value[i].bookmark = 0
          foundInWordsTable.value!.splice(i, 1)
        }
      }
    }
  }
  await database.words.put(getWord[0])
  await SearchStore.changeSearchBookmark(WordID)
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
  <backHeader v-if="laptopScreen">
    {{ props.title }}
  </backHeader>
  <HeaderLarge v-else />
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
  <div v-if="laptopScreen">
    <Loader v-if="loading" />
    <div
      v-else
    >
      <div
        v-if="emptyBookmark"
        class="w-full h-full"
      >
        <div
          v-if="resultW?.length===0"
          class="empty-bookmark-box"
        >
          <div class="text-center mt-8">
            <p class="font-semibold opacity-50">
              نشان شده ای یافت نشد!!
            </p>
          </div>

          <div class="bookmark-box">
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
          </div>
          <div class="arrow-click-box">
            <p class="click-text">
              کلیک کن
            </p>
            <svg
              class="opacity-25"
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="110px"
              height="110px"
              viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet"
            >

              <g
                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path
                  d="M1194 4876 c-344 -125 -633 -358 -854 -689 -376 -562 -444 -1263
-176 -1812 202 -412 545 -651 1014 -705 58 -7 181 -11 282 -8 l179 3 6 -50
c11 -84 52 -240 85 -322 81 -202 186 -364 345 -531 229 -240 509 -409 830
-500 134 -38 207 -47 385 -47 146 0 193 4 280 24 381 84 733 318 1008 669 52
66 55 101 13 143 -22 21 -39 29 -66 29 -33 0 -47 -11 -173 -138 -200 -202
-374 -311 -622 -392 -176 -57 -230 -65 -455 -65 -181 1 -211 3 -312 27 -423
100 -757 363 -946 743 -65 130 -120 294 -141 416 l-6 37 72 17 c40 10 130 37
199 61 708 241 1234 740 1333 1264 20 103 20 246 1 328 -57 239 -257 392 -515
392 -199 0 -352 -71 -550 -254 -434 -400 -716 -940 -771 -1477 l-12 -117 -45
-6 c-86 -12 -338 -6 -428 9 -484 84 -818 415 -925 918 -31 145 -31 376 0 537
98 512 418 985 855 1265 32 20 108 62 168 91 131 65 151 97 100 157 -21 24
-54 21 -158 -17z m1875 -1326 c141 -71 229 -382 162 -574 -64 -186 -331 -479
-605 -664 -210 -142 -447 -257 -666 -322 -40 -12 -79 -24 -86 -27 -17 -6 -12
41 17 187 100 494 511 1129 869 1340 130 77 236 98 309 60z"
                />
                <path
                  d="M4770 1410 c-289 -16 -576 -65 -617 -106 -27 -27 -29 -60 -7 -92 27
-39 55 -43 176 -27 111 15 476 21 535 9 29 -6 30 -7 26 -57 -13 -171 -37 -344
-58 -422 -48 -173 -25 -276 60 -283 78 -7 132 46 159 153 29 112 56 329 68
537 11 189 10 208 -5 232 -41 62 -84 69 -337 56z"
                />
              </g>
            </svg>
          </div>
        </div>
        <template v-else>
          <div class="grid h-auto bg-gray-200 pt-20 gap-x-8 gap-y-2 justify-items-stretch mb-24">
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
                  class="w-full h-full mt-14 mb-16"
                >
                  <searchLoader v-if="searchLoading" />
                  <!--------------------------------------- find ---------------------------------------------->
                  <div
                    v-if="isFound"
                    class="grid h-auto bg-gray-200 gap-x-8 gap-y-2 justify-items-stretch mb-24"
                  >
                    <transition-group
                      name="list"
                    >
                      <div
                        v-for="item in foundInWordsTable"
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
                  </div>
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
                  v-if="searchQuery.length===0"
                  class="grid h-auto bg-gray-200 pt-19.5 gap-x-8 gap-y-2 justify-items-stretch mb-24"
                >
                  <transition-group
                    name="list"
                    appear
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
                        <transition
                          name="bookmarkButton"
                          mode="out-in"
                        >
                          <button
                            v-if="item.bookmark===0"
                            type="submit"
                            class="w-5 h-5"
                            @click="bookmarkRemove(item.WordID)"
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
                            @click="bookmarkRemove(item.WordID)"
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
                </div>
              </div>
            </transition>
          </div>
        </template>
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
              class="w-full h-full mt-14 mb-16"
            >
              <searchLoader v-if="searchLoading" />
              <!--------------------------------------- find ---------------------------------------------->
              <div
                v-if="isFound"
                class="grid h-auto bg-gray-200 pt-20 gap-x-8 gap-y-2 justify-items-stretch mb-24"
              >
                <transition-group
                  name="list"
                >
                  <div
                    v-for="item in foundInWordsTable"
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
              </div>
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
              v-if="searchQuery.length===0"
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
            </div>
          </div>
        </transition>
      </template>
      <audio
        v-if="playingId !== -1"
        :key="playingId"
        :src="audioSrc"
        autoplay
        @error="audioError"
        @ended="playingId = -1"
      />
      <div
        v-if="resultW && resultW.length < 4"
        class=" yellow-button__box"
      >
        <button
          class="yellow-button"
        >
          <p class="w-4/5">
            تمرین لغات برای نشان شده ها باید بیشتر از 4 عنصر داشته باشد
          </p>
        </button>
      </div>
      <div
        v-else
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
  </div>
  <ListLarge v-else />
</template>
<style>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.bookmarkButton-enter-active,
.bookmarkButton-leave-active {
  transition: all 0.5s ease;
}

.bookmarkButton-enter-from,
.bookmarkButton-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}
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
.input-box{
  @apply h-11 flex fixed top-16 z-10  w-full justify-center px-2
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
  @apply bg-gray-200 h-screen w-full text-center animate-opacity
}
.not-find__text{
  @apply font-IRANSans pt-16 text-xl
}
.yellow-button__box{
  @apply w-full
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
@keyframes blink-animation  {
        to {
          visibility: hidden;
        }
      }
@keyframes pulse {
  0% { opacity: 50% }
	50% { opacity: 100% }
	100% { opacity:50% }
}
.click-text{
  margin-right: 30px;
  animation: pulse linear 2.5s infinite;

  @apply font-semibold opacity-50
}
.arrow-click-box{
  transform: rotate(-60deg);
  margin-right: 96px;
  margin-top: -90px;
}
.bookmark-box{
  animation: blink-animation 1.5s steps(5, start) infinite;
  margin-top: -90px;
  @apply w-32 h-32 opacity-25 mr-6
}
.empty-bookmark-box{
  @apply font-IRANSans grid justify-center w-full h-screen items-center
}

</style>
