<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import backHeader from '../components/BackHeader.vue'
import Modal from '../components/Modal.vue'
import { useRouter } from 'vue-router'
import { Words } from '../datasource/database/dexieDB'
import { useWordsDB } from '../datasource/database/wordsDB'
import Loader from '../components/Loader.vue'
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
  console.log('all')
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
function randomQuiz () {
  openAnime.value = true
  bgGreenAnswer1.value = false
  bgGreenAnswer2.value = false
  bgGreenAnswer3.value = false
  bgGreenAnswer4.value = false
  bgRedAnswer1.value = false
  bgRedAnswer2.value = false
  bgRedAnswer3.value = false
  bgRedAnswer4.value = false
  const randomQ = Math.floor(Math.random() * resultW.value?.length)
  randomA.value = Math.floor(Math.random() * 4) + 1
  question.value = resultW.value[randomQ].Ar
  if (randomA.value === 1) {
    answer1.value = resultW.value[randomQ].Fa
    answer2.value = 'اشتباه'
    answer3.value = 'اشتباه'
    answer4.value = 'اشتباه'
  }
  if (randomA.value === 2) {
    answer1.value = 'اشتباه'
    answer2.value = resultW.value[randomQ].Fa
    answer3.value = 'اشتباه'
    answer4.value = 'اشتباه'
  }
  if (randomA.value === 3) {
    answer1.value = 'اشتباه'
    answer2.value = 'اشتباه'
    answer3.value = resultW.value[randomQ].Fa
    answer4.value = 'اشتباه'
  }
  if (randomA.value === 4) {
    answer1.value = 'اشتباه'
    answer2.value = 'اشتباه'
    answer3.value = 'اشتباه'
    answer4.value = resultW.value[randomQ].Fa
  }
}
function checkAnswer (num:number) {
  openAnime.value = false
  if (num === 1) {
    if (randomA.value === num) {
      correctAnswer.value++
      bgGreenAnswer1.value = true
    } else {
      wrongAnswer.value++
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
      correctAnswer.value++
      bgGreenAnswer2.value = true
    } else {
      wrongAnswer.value++
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
      correctAnswer.value++
      bgGreenAnswer3.value = true
    } else {
      wrongAnswer.value++
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
      correctAnswer.value++
      bgGreenAnswer4.value = true
    } else {
      wrongAnswer.value++
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
  setTimeout(randomQuiz, 2000)
}
</script>
<template>
  <backHeader>
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
  <transition name="modal">
    <modal
      v-if="modalQuizValue"
      @close="modalClose"
    >
      <div class="grid font-IRANSans text-sm gap-4">
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
    class="pt-16 w-screen h-auto grid"
  >
    <div
      class="quiz-correction-box"
    >
      <p class="quiz-correction-text__correct">
        <fa icon="check-circle" />
        <span>{{ correctAnswer }}</span>
      </p>
      <p class="quiz-correction-text__false">
        <fa icon="times-circle" />
        <span>{{ wrongAnswer }}</span>
      </p>
    </div>
    <div
      class="quiz-question-box"
      :class="{'animate-opacity':openAnime}"
    >
      <p class="self-end font-IRANSans text-sm">
        معنی عبارت زیر چیست؟
      </p>
      <p class="self-start font-IRANSans font-bold text-xl">
        {{ question }}
      </p>
    </div>
    <div class="quiz-option-box">
      <p
        class="quiz-option bg-white"
        :class="{'bg-green-500':bgGreenAnswer1,'bg-red-500':bgRedAnswer1,'animate-opacity':openAnime}"
        @click="checkAnswer(1)"
      >
        {{ answer1 }}
      </p>
      <p
        class="quiz-option bg-white"
        :class="{'bg-green-500':bgGreenAnswer2,'bg-red-500':bgRedAnswer2,'animate-opacity':openAnime}"
        @click="checkAnswer(2)"
      >
        {{ answer2 }}
      </p>
      <p
        class="quiz-option bg-white"
        :class="{'bg-green-500':bgGreenAnswer3,'bg-red-500':bgRedAnswer3,'animate-opacity':openAnime}"
        @click="checkAnswer(3)"
      >
        {{ answer3 }}
      </p>
      <p
        class="quiz-option bg-white"
        :class="{'bg-green-500':bgGreenAnswer4,'bg-red-500':bgRedAnswer4,'animate-opacity':openAnime}"
        @click="checkAnswer(4)"
      >
        {{ answer4 }}
      </p>
    </div>
  </div>
</template>
<style>
.quiz-correction-text__false{
  @apply bg-red-600 rounded-2xl w-14 flex items-center gap-x-3 pr-1 shadow-2xl
}
.quiz-correction-text__correct{
  @apply bg-green-600 rounded-2xl w-14 flex items-center gap-x-3 pr-1 shadow-2xl
}
.quiz-correction-box{
  @apply w-full h-auto float-right flex gap-x-3 pr-5 text-white font-IRANSans mt-2 cursor-default
}
.quiz-question-box{
  @apply w-11/12 h-44 bg-white grid grid-rows-2 justify-items-center justify-self-center shadow-lg mt-3 gap-y-5 rounded-2xl cursor-default
}
.quiz-option{
  @apply w-full rounded-2xl h-32 grid justify-items-center items-center font-IRANSans text-base shadow-2xl active:scale-105 cursor-pointer
}
.quiz-option-box{
  @apply h-full w-screen grid grid-cols-2 grid-rows-2 gap-3 p-4
}
</style>
