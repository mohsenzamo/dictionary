<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import db, { Words } from '../datasource/database/dexieDB'
import { useWordsDB } from '../datasource/database/wordsDB'
import Loader from '../components/Loader.vue'
import { useRouter } from 'vue-router'
import searchLoader from '../components/searchLoader.vue'
import { useListSearchRepo } from '../datasource/repository/listSearchRepo'
import { useSearchDB } from '../datasource/database/searchDB'
import Modal from '../components/Modal.vue'
import HeaderLarge from '../components/HeaderLarge.vue'
import { useStore } from '../store'
const emptyBookmark = ref(false)
const title = computed(() => useStore().propTitle)
const id = computed(() => useStore().propId)
if (useStore().propId === -100) {
  emptyBookmark.value = true
  useWordsDB().wordsGet(useStore().propId)
    .then(r => {
      resultW.value = r
    }).finally(() => {
      loading.value = false
    })
} else {
  emptyBookmark.value = false
  useWordsDB().wordsGet(useStore().propId)
    .then(r => {
      resultW.value = r
    }).finally(() => {
      loading.value = false
    })
}
const loading = ref(true)
const resultW = ref<Words[] | null>(null)
useWordsDB().wordsGet(useStore().propId)
  .then(x => {
    resultW.value = x
  }).finally(() => {
    loading.value = false
  })
const router = useRouter()
function pushLinkQuiz (id:number) {
  router.push({
    name: 'Quiz',
    params: {
      id: id
    }
  })
}
const words = computed(() => useListSearchRepo().words)
async function bookmarkSelect (WordID:number) {
  const getWord = await db.words.where('WordID').equals(WordID).toArray()
  if (getWord[0].bookmark === 0) {
    getWord[0].bookmark = 1
    for (let i = 0; i < resultW.value!.length; i++) {
      if (resultW.value![i].WordID === WordID) {
        resultW.value![i].bookmark = 1
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
    for (let i = 0; i < resultW.value!.length; i++) {
      if (resultW.value![i].WordID === WordID) {
        resultW.value![i].bookmark = 0
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
async function bookmarkSelect2 (WordID:number) {
  const getWord = await db.words.where('WordID').equals(WordID).toArray()
  if (getWord[0].bookmark === 0) {
    getWord[0].bookmark = 1
    for (let i = 0; i < resultW.value!.length; i++) {
      if (resultW.value![i].WordID === WordID) {
        resultW.value![i].bookmark = 1
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
    for (let i = 0; i < resultW.value!.length; i++) {
      if (resultW.value![i].WordID === WordID) {
        resultW.value![i].bookmark = 0
        resultW.value!.splice(i, 1)
      }
    }
    if (words.value) {
      for (let i = 0; i < words.value.length; i++) {
        if (words.value[i].WordID === WordID) {
          words.value[i].bookmark = 0
          words.value!.splice(i, 1)
        }
      }
    }
  }
  await db.words.put(getWord[0])
  await useSearchDB().createSearchArray2(WordID)
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
  <audio
    v-if="playingId !== -1"
    :key="playingId"
    :src="audioSrc"
    autoplay
    @error="audioError"
    @ended="playingId = -1"
  />
  <loader v-if="loading" />
  <div v-else>
    <div
      v-if="emptyBookmark"
      class="mt-32"
    >
      <div
        v-if="resultW?.length===0"
        class="empty-bookmark-box-lg w-full h-screen font-IRANSans"
      >
        <div class="grid justify-center mt-10">
          <p class="font-bold text-2xl">
            نشان شده ای یافت نشد!!
          </p>
        </div>
        <div class="bookmark-box-lg ">
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
        <div class="arrow-click-box-lg">
          <p class="click-text-lg">
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
      <div
        v-else
        class="font-IRANSans bg-gray-200 grid justify-items-center mt-5 list-box-lg mb-16"
      >
        <transition-group
          name="list"
        >
          <div
            v-for="item in resultW"
            :key="item.WordID"
            class="bg-gray-100 even:bg-gray-300  rounded-lg font-IRANSans grid grid-cols-3 justify-center text-center items-center p-4 mt-4 w-11/12 word-box__shadow-lg  "
          >
            <div class="word-box__ability-bookmark-lg">
              <transition
                name="bookmarkButton"
                mode="out-in"
              >
                <div>
                  <transition
                    name="bookmarkButton"
                    mode="out-in"
                  >
                    <button
                      v-if="item.bookmark===0"
                      class="w-8 h-8"
                      type="submit"
                      @click="bookmarkSelect2(item.WordID)"
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
                      @click="bookmarkSelect2(item.WordID)"
                    >
                      <fa
                        icon="bookmark"
                        class="text-4xl text-green-500"
                      />
                    </button>
                  </transition>
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
        </transition-group>
      </div>
    </div>
    <div
      v-else
      class="font-IRANSans bg-gray-200 grid justify-items-center mt-32 list-box-lg mb-16"
    >
      <div
        v-for="item in resultW"
        :key="item.WordID"
        class="bg-gray-100 even:bg-gray-300  rounded-lg font-IRANSans grid grid-cols-3 justify-center text-center items-center p-4 mt-4 w-11/12 word-box__shadow-lg"
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
    </div>
  </div>
  <div
    v-if="resultW && resultW?.length < 4"
    class="fixed grid items-center justify-items-center bottom-0 w-full"
  >
    <button class="bg-yellow-500 flex font-IRANSans text-xl rounded-t-2xl h-12 items-center px-4">
      برای تمرین بیشتر از 4 لغت الزامیست
    </button>
  </div>
  <div
    v-else
    class="fixed grid items-center justify-items-center bottom-0 w-full"
  >
    <button
      class="bg-yellow-500 flex font-IRANSans text-xl rounded-t-2xl h-12 items-center px-4"
      @click="pushLinkQuiz(id)"
    >
      <span class="mx-4">تمرین لغات</span>/
      <span class="mx-4">{{ title }}</span>
    </button>
  </div>
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

.bookmark-box-lg{
  animation: blink-animation 1.5s steps(5, start) infinite;
  margin-top: -90px;
  @apply w-64 h-64 opacity-25 mr-6
}
.empty-bookmark-box-lg{
  @apply font-IRANSans grid justify-center w-full h-screen items-center
}
.arrow-click-box-lg{
  transform: rotate(-60deg);
  margin-right: 200px;
  margin-top: -90px;
}
.click-text-lg{
  margin-right: 30px;
  font-size: 28px;
  animation: pulse linear 2.5s infinite;

  @apply font-semibold opacity-50
}
.word-box__shadow-lg{
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
}

/* equalizer */

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

</style>
