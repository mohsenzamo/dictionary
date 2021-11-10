<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue'
import backHeader from '../components/BackHeader.vue'
import Modal from '../components/Modal.vue'
import { useRouter } from 'vue-router'
import { Words } from '../datasource/database/dexieDB'
import { useWordsDB } from '../datasource/database/wordsDB'
import Loader from '../components/Loader.vue'
import HeaderLarge from '../components/HeaderLarge.vue'
const mediaMatcher = matchMedia('(max-width: 1024px)')
const laptopScreen = ref(mediaMatcher.matches)
mediaMatcher.addListener(() => {
  laptopScreen.value = !laptopScreen.value
})
const modalQuizValue = ref(false)
const router = useRouter()
function goBack () {
  router.back()
}
let intervalId:any = null
const timer = ref(0)
const loading = ref(true)
const settimer = function () {
  if (modalQuizValue.value === false) {
    timer.value++
  } else {
    clearInterval(intervalId)
  }
}
watchEffect(() => {
  intervalId = setInterval(settimer, 1000)
})
const second = ref(0)
const minute = ref(0)
function modalOpen () {
  minute.value = (Math.floor(timer.value / 60))
  second.value = (timer.value % 60)
  modalQuizValue.value = true
}
function modalClose () {
  intervalId = setInterval(settimer, 1000)
  modalQuizValue.value = false
}
const props = defineProps<{
  id: string
}>()
if (props.id === 'all') {
  useWordsDB().wordsGetAll().then(r => {
    resultW.value = r
    randomQuiz()
  }).finally(() => {
    loading.value = false
  })
} else {
  useWordsDB().wordsGet(+props.id)
    .then(r => {
      resultW.value = r
      randomQuiz()
    }).finally(() => {
      loading.value = false
    })
}
const resultW = ref<Words[] | null>(null)
const question = ref<null|string>(null)
const answer1 = ref<null|string>(null)
const answer2 = ref<null|string>(null)
const answer3 = ref<null|string>(null)
const answer4 = ref<null|string>(null)
const randomA = ref<null|number>(null)
const bgGreenAnswer1 = ref(false)
const bgRedAnswer1 = ref(false)
const bgGreenAnswer2 = ref(false)
const bgRedAnswer2 = ref(false)
const bgGreenAnswer3 = ref(false)
const bgRedAnswer3 = ref(false)
const bgGreenAnswer4 = ref(false)
const bgRedAnswer4 = ref(false)
const openAnime = ref(false)
const correctAnswer = ref(0)
const wrongAnswer = ref(0)
const randomQ = ref<null|number>(null)
const expectNumber1 = ref<null|number>(null)
const expectNumber2 = ref<null|number>(null)
const expectNumber3 = ref<null|number>(null)
const counter = ref(0)

function expectRandom1 () {
  const num = Math.floor(Math.random() * resultW.value!.length)
  if (num === randomQ.value) {
    expectRandom1()
  } else {
    expectNumber1.value = num
  }
}
function expectRandom2 () {
  const num = Math.floor(Math.random() * resultW.value!.length)
  if (num === randomQ.value || num === expectNumber1.value) {
    expectRandom2()
  } else {
    expectNumber2.value = num
  }
}
function expectRandom3 () {
  const num = Math.floor(Math.random() * resultW.value!.length)
  if (num === randomQ.value || num === expectNumber1.value || num === expectNumber2.value) {
    expectRandom3()
  } else {
    expectNumber3.value = num
  }
}
function randomQuiz () {
  counter.value = 0
  openAnime.value = true
  bgGreenAnswer1.value = false
  bgGreenAnswer2.value = false
  bgGreenAnswer3.value = false
  bgGreenAnswer4.value = false
  bgRedAnswer1.value = false
  bgRedAnswer2.value = false
  bgRedAnswer3.value = false
  bgRedAnswer4.value = false
  randomQ.value = Math.floor(Math.random() * resultW.value!.length)
  randomA.value = Math.floor(Math.random() * 4) + 1
  expectRandom1()
  expectRandom2()
  expectRandom3()
  question.value = resultW.value![randomQ.value].Ar
  if (randomA.value === 1 && resultW.value) {
    answer1.value = resultW.value![randomQ.value].Fa
    answer2.value = resultW.value[expectNumber1.value!].Fa
    answer3.value = resultW.value[expectNumber2.value!].Fa
    answer4.value = resultW.value[expectNumber3.value!].Fa
  }
  if (randomA.value === 2 && resultW.value) {
    answer1.value = resultW.value[expectNumber1.value!].Fa
    answer2.value = resultW.value[randomQ.value].Fa
    answer3.value = resultW.value[expectNumber2.value!].Fa
    answer4.value = resultW.value[expectNumber3.value!].Fa
  }
  if (randomA.value === 3 && resultW.value) {
    answer1.value = resultW.value[expectNumber1.value!].Fa
    answer2.value = resultW.value[expectNumber2.value!].Fa
    answer3.value = resultW.value[randomQ.value].Fa
    answer4.value = resultW.value[expectNumber3.value!].Fa
  }
  if (randomA.value === 4 && resultW.value) {
    answer1.value = resultW.value[expectNumber1.value!].Fa
    answer2.value = resultW.value[expectNumber2.value!].Fa
    answer3.value = resultW.value[expectNumber3.value!].Fa
    answer4.value = resultW.value[randomQ.value].Fa
  }
}
function checkAnswer (num:number) {
  counter.value++
  openAnime.value = false
  if (num === 1) {
    if (randomA.value === num) {
      if (counter.value === 1) {
        correctAnswer.value++
      }
      bgGreenAnswer1.value = true
    } else {
      if (counter.value === 1) {
        wrongAnswer.value++
      }
      bgRedAnswer1.value = true
      if (randomA.value === 2) {
        bgGreenAnswer2.value = true
      }
      if (randomA.value === 3) {
        bgGreenAnswer3.value = true
      }
      if (randomA.value === 4) {
        bgGreenAnswer4.value = true
      }
    }
  }
  if (num === 2) {
    if (randomA.value === num) {
      if (counter.value === 1) {
        correctAnswer.value++
      }
      bgGreenAnswer2.value = true
    } else {
      if (counter.value === 1) {
        wrongAnswer.value++
      }
      bgRedAnswer2.value = true
      if (randomA.value === 1) {
        bgGreenAnswer1.value = true
      }
      if (randomA.value === 3) {
        bgGreenAnswer3.value = true
      }
      if (randomA.value === 4) {
        bgGreenAnswer4.value = true
      }
    }
  }
  if (num === 3) {
    if (randomA.value === num) {
      if (counter.value === 1) {
        correctAnswer.value++
      }
      bgGreenAnswer3.value = true
    } else {
      if (counter.value === 1) {
        wrongAnswer.value++
      }
      bgRedAnswer3.value = true
      if (randomA.value === 2) {
        bgGreenAnswer2.value = true
      }
      if (randomA.value === 1) {
        bgGreenAnswer1.value = true
      }
      if (randomA.value === 4) {
        bgGreenAnswer4.value = true
      }
    }
  }
  if (num === 4) {
    if (randomA.value === num) {
      if (counter.value === 1) {
        correctAnswer.value++
      }
      bgGreenAnswer4.value = true
    } else {
      if (counter.value === 1) {
        wrongAnswer.value++
      }
      bgRedAnswer4.value = true
      if (randomA.value === 2) {
        bgGreenAnswer2.value = true
      }
      if (randomA.value === 3) {
        bgGreenAnswer3.value = true
      }
      if (randomA.value === 1) {
        bgGreenAnswer1.value = true
      }
    }
  }
  if (counter.value === 1) {
    setTimeout(randomQuiz, 2000)
  }
}
</script>
<template>
  <backHeader v-if="laptopScreen">
    <template #arrow>
      <span
        class="text-xl cursor-pointer"
        @click="modalOpen"
      ><fa icon="arrow-right" /></span>
    </template>
    <template #default>
      تمرین لغات
    </template>
    <template #logo>
      <img
        alt="Vue logo"
        src="../assets/logo.png"
        class="h-12"
      >
    </template>
  </backHeader>
  <HeaderLarge v-else />
  <transition name="modal">
    <modal
      v-if="modalQuizValue"
      @close="modalClose"
    >
      <div class="grid font-IRANSans text-sm gap-4 lg:text-lg lg:px-10">
        <div>
          <p class="flex justify-between">
            <span>تعداد کل سوالات</span>
            <span>{{ wrongAnswer+correctAnswer }}</span>
          </p>
          <p class="flex justify-between text-green-600">
            <span>تعداد پاسخ درست</span>
            <span>{{ correctAnswer }}</span>
          </p>
          <p class="flex justify-between text-red-600">
            <span>تعداد پاسخ غلط</span>
            <span>{{ wrongAnswer }}</span>
          </p>
          <p class="flex justify-between">
            <span>زمان</span>
            <span>
              <span v-if="minute > 0">
                {{ minute }}
              </span>
              <span v-if="minute > 0">
                دقیقه
              </span>
              <span v-if="second > 0">
                {{ second }}
              </span>
              <span v-if="second > 0">
                ثانیه
              </span>
            </span>
          </p>
        </div>
        <button
          class="
        bg-yellow-500
        rounded-md
        h-8
      "
          @click="goBack"
        >
          <p>خروج از تمرین لغات</p>
        </button>
      </div>
    </modal>
  </transition>
  <Loader v-if="loading" />
  <div
    v-else
    class="pt-16 w-full h-auto grid lg:pt-5"
  >
    <div
      class="w-full h-auto flex pr-5 text-white font-IRANSans mt-2 cursor-default lg:text-xl lg:justify-center"
    >
      <p class="bg-green-600 rounded-2xl w-14 flex items-center pr-1 shadow-2xl lg:w-20">
        <fa
          icon="check-circle"
          class="ml-3 lg:ml-5"
        />
        <span>{{ correctAnswer }}</span>
      </p>
      <p class="bg-red-600 rounded-2xl w-14 flex items-center pr-1 shadow-2xl mr-2 lg:w-20">
        <fa
          icon="times-circle"
          class="ml-3 lg:ml-5"
        />
        <span>{{ wrongAnswer }}</span>
      </p>
    </div>
    <div
      class="w-11/12 h-44 bg-white grid grid-rows-2 justify-items-center justify-self-center shadow-lg mt-3 gap-y-5 rounded-2xl cursor-default lg:w-5/12"
      :class="{'animate-opacity':openAnime}"
    >
      <p class="self-end font-IRANSans text-sm lg:text-base">
        معنی عبارت زیر چیست؟
      </p>
      <p class="self-start font-IRANSans font-bold text-xl lg:text-2xl">
        {{ question }}
      </p>
    </div>
    <div class="h-full w-full grid grid-cols-2 grid-rows-2 gap-3 p-4 lg:items-center lg:justify-items-center lg:px-72">
      <p
        class="w-full rounded-2xl h-32 grid justify-items-center items-center font-IRANSans text-base shadow-2xl active:scale-x-110 cursor-pointer text-center lg:w-9/12 lg:text-xl bg-white"
        :class="{'bg-green-500':bgGreenAnswer1,'bg-red-500':bgRedAnswer1,'animate-opacity':openAnime}"
        @click="checkAnswer(1)"
      >
        {{ answer1 }}
      </p>
      <p
        class="w-full rounded-2xl h-32 grid justify-items-center items-center font-IRANSans text-base shadow-2xl active:scale-x-110 cursor-pointer text-center lg:w-9/12 lg:text-xl bg-white"
        :class="{'bg-green-500':bgGreenAnswer2,'bg-red-500':bgRedAnswer2,'animate-opacity':openAnime}"
        @click="checkAnswer(2)"
      >
        {{ answer2 }}
      </p>
      <p
        class="w-full rounded-2xl h-32 grid justify-items-center items-center font-IRANSans text-base shadow-2xl active:scale-x-110 cursor-pointer text-center lg:w-9/12 lg:text-xl bg-white"
        :class="{'bg-green-500':bgGreenAnswer3,'bg-red-500':bgRedAnswer3,'animate-opacity':openAnime}"
        @click="checkAnswer(3)"
      >
        {{ answer3 }}
      </p>
      <p
        class="w-full rounded-2xl h-32 grid justify-items-center items-center font-IRANSans text-base shadow-2xl active:scale-x-110 cursor-pointer text-center lg:w-9/12 lg:text-xl bg-white"
        :class="{'bg-green-500':bgGreenAnswer4,'bg-red-500':bgRedAnswer4,'animate-opacity':openAnime}"
        @click="checkAnswer(4)"
      >
        {{ answer4 }}
      </p>
    </div>
  </div>
</template>
