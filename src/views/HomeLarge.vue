<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useCreateRepo } from '../datasource/repository/repo'
import Modal from '../components/Modal.vue'
import { useRouter } from 'vue-router'
const categoryList = computed(() => useCreateRepo().categroyTable)
const slideCount = computed(() => categoryList.value!.length / 6)
const slide = ref(1)
const modalPremiumValue = ref(false)
function change (y:number) {
  if (y === 1) {
    if (slide.value < slideCount.value) {
      slide.value++
    } else {
      slide.value = 1
    }
  } else {
    if (slide.value > 1) {
      slide.value--
    } else {
      slide.value = slideCount.value
    }
  }
}
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
</script>
<template>
  <transition name="modal">
    <modal
      v-if="modalPremiumValue"
      @close="modalPremiumValue = false"
    >
      <div class="h-64 grid items-center justify-items-center text-center text-2xl font-IRANSans px-16">
        <p>
          برای استفاده از این قسمت باید نرم افزار را به نسخه طلایی ارتقا دهید.<br>با دریافت نسخه طلایی نرم افزار، امکان دسترسی به هزاران لغت در دسته بندی های مختلف را خواهید داشت.
        </p>
        <button
          class="
        bg-yellow-500 w-8/12 h-12 rounded-xl
      "
        >
          <p>ارتقا به نسخه طلایی</p>
        </button>
      </div>
    </modal>
  </transition>
  <div>
    <button
      class="absolute right-72 bottom-48 text-5xl z-10"
      @click="change(0)"
    >
      <fa icon="chevron-right" />
    </button>
    <div
      v-for="count in slideCount"
      :key="count"
      class="mt-20"
    >
      <div
        v-if="slide === count"
        class="body"
        style="--n-rows: 3; --n-cols: 6"
      >
        <div
          class="hex-cell grid items-center justify-items-center animate-upTOdown"
          @click="pushLinkList('List',categoryList![count*6-6].Title,categoryList![count*6-6].CategoryID,categoryList![count*6-6].IsFree)"
        >
          <div
            v-if="categoryList![count*6-6].IsFree === 0"
            class="absolute w-full h-full bg-black bg-opacity-50 grid items-center justify-items-center text-yellow-500"
            @click="modalPremiumValue = true"
          >
            <p class="h-16 w-16 lock-icon">
              <fa
                icon="lock"
              />
            </p>
          </div>
          <div
            v-if="categoryList![count*6-6].Icon"
            class="w-16 h-16 -mb-24 grid items-center justify-items-center"
            v-html="categoryList![count*6-6].Icon"
          />
          <p>{{ categoryList![count*6-6].Title }}</p>
        </div>
        <div
          class="hex-cell grid items-center justify-items-center animate-upTOdown"
          @click="pushLinkList('List',categoryList![count*6-5].Title,categoryList![count*6-5].CategoryID,categoryList![count*6-5].IsFree)"
        >
          <div
            v-if="categoryList![count*6-5].IsFree === 0"
            class="absolute w-full h-full bg-black bg-opacity-50 grid items-center justify-items-center text-yellow-500"
            @click="modalPremiumValue = true"
          >
            <p class="h-16 w-16 lock-icon">
              <fa
                icon="lock"
              />
            </p>
          </div>
          <div
            v-if="categoryList![count*6-5].Icon"
            class="w-16 h-16 -mb-24 grid items-center justify-items-center"
            v-html="categoryList![count*6-5].Icon"
          />
          <p>{{ categoryList![count*6-5].Title }}</p>
        </div>
        <div
          class="hex-cell grid items-center justify-items-center animate-rigthTOleft"
          @click="pushLinkList('List',categoryList![count*6-4].Title,categoryList![count*6-4].CategoryID,categoryList![count*6-4].IsFree)"
        >
          <div
            v-if="categoryList![count*6-4].IsFree === 0"
            class="absolute w-full h-full bg-black bg-opacity-50 grid items-center justify-items-center text-yellow-500"
            @click="modalPremiumValue = true"
          >
            <p class="h-15 w-16 lock-icon">
              <fa
                icon="lock"
              />
            </p>
          </div>
          <div
            v-if="categoryList![count*6-4].Icon"
            class="w-16 h-16 -mb-24 grid items-center justify-items-center"
            v-html="categoryList![count*6-4].Icon"
          />
          <p>{{ categoryList![count*6-4].Title }}</p>
        </div>
        <div
          class="hex-cell grid items-center justify-items-center animate-open"
          @click="pushLinkList('List','نشان شده ها',-100,1)"
        >
          <div
            class="w-16 h-16 -mb-24 grid items-center justify-items-center"
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
          <p class="text-center">
            نشان شده ها
          </p>
        </div>
        <div
          class="hex-cell grid items-center justify-items-center animate-leftTOright"
          @click="pushLinkList('List',categoryList![count*6-3].Title,categoryList![count*6-3].CategoryID,categoryList![count*6-3].IsFree)"
        >
          <div
            v-if="categoryList![count*6-3].IsFree === 0"
            class="absolute w-full h-full bg-black bg-opacity-50 grid items-center justify-items-center text-yellow-500"
            @click="modalPremiumValue = true"
          >
            <p class="h-16 w-16 lock-icon">
              <fa
                icon="lock"
              />
            </p>
          </div>
          <div
            v-if="categoryList![count*6-3].Icon"
            class="w-16 h-16 -mb-24 grid items-center justify-items-center"
            v-html="categoryList![count*6-3].Icon"
          />
          <p>{{ categoryList![count*6-3].Title }}</p>
        </div>
        <div
          class="hex-cell grid items-center justify-items-center animate-downTOup"
          @click="pushLinkList('List',categoryList![count*6-2].Title,categoryList![count*6-2].CategoryID,categoryList![count*6-2].IsFree)"
        >
          <div
            v-if="categoryList![count*6-2].IsFree === 0"
            class="absolute w-full h-full bg-black bg-opacity-50 grid items-center justify-items-center text-yellow-500"
            @click="modalPremiumValue = true"
          >
            <p class="h-16 w-16 lock-icon">
              <fa
                icon="lock"
              />
            </p>
          </div>
          <div
            v-if="categoryList![count*6-2].Icon"
            class="w-16 h-16 -mb-24 grid items-center justify-items-center"
            v-html="categoryList![count*6-2].Icon"
          />
          <p>{{ categoryList![count*6-2].Title }}</p>
        </div>
        <div
          class="hex-cell grid items-center justify-items-center animate-downTOup"
          @click="pushLinkList('List',categoryList![count*6-1].Title,categoryList![count*6-1].CategoryID,categoryList![count*6-1].IsFree)"
        >
          <div
            v-if="categoryList![count*6-1].IsFree === 0"
            class="absolute w-full h-full bg-black bg-opacity-50 grid items-center justify-items-center text-yellow-500"
            @click="modalPremiumValue = true"
          >
            <p class="h-16 w-16 lock-icon">
              <fa
                icon="lock"
              />
            </p>
          </div>
          <div
            v-if="categoryList![count*6-1].Icon"
            class="w-16 h-16 -mb-24 grid items-center justify-items-center"
            v-html="categoryList![count*6-1].Icon"
          />
          <p>{{ categoryList![count*6-1].Title }}</p>
        </div>
      </div>
    </div>
    <button
      class="absolute left-72 bottom-48 text-5xl z-10"
      @click="change(1)"
    >
      <fa icon="chevron-left" />
    </button>
    <div class="flex items-center justify-center pb-6 -mt-20">
      <div
        v-for="n in slideCount"
        :key="n"
        class="border-gray-500 border-2 w-4 h-4 rounded-full mx-4 cursor-pointer"
        :class="{'bg-yellow-500':slide===n}"
        @click="slide = n"
      />
    </div>
    <div
      class="talkbubble-left fixed bottom-20 left-10 hover:left-20 transition-all grid items-center justify-items-center font-IRANSans w-28 h-28 bg-yellow-500 animate-leftTOright cursor-pointer"
    >
      <p>
        آزمون مرحله ای
      </p>
    </div>
    <div
      class="talkbubble-right fixed bottom-20 right-10 hover:right-20 transition-all grid items-center justify-items-center font-IRANSans w-28 h-28 bg-yellow-500 animate-rigthTOleft cursor-pointer"
      @click="pushLinkQuiz('all')"
    >
      <p>
        تمرین لغات
      </p>
    </div>
  </div>
</template>
