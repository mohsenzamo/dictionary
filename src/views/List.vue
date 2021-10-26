<script lang="ts" setup>
import { ref } from 'vue'
import backHeader from '../components/BackHeader.vue'
import { Words } from '../datasource/database/dexieDB'
import { useWordsDB } from '../datasource/database/wordsDB'
import Loader from '../components/Loader.vue'
// @ts-ignore
import backToTop from 'vue-backtotop'
import { useRouter } from 'vue-router'
const props = defineProps<{
  title: string
  id: string
}>()
const loading = ref(true)
const resultW = ref<Words[] | null>(null)
useWordsDB().wordsGet(+props.id)
  .then(r => {
    resultW.value = r
  }).finally(() => { loading.value = false })
const router = useRouter()
function pushLinkQuiz (id:number) {
  router.push({
    name: 'Quiz',
    params: {
      id: id
    }
  })
}
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
      </div>
      <div class="word-box__abilities">
        <div class="word-box__abilities-bookmark">
          <fa
            icon="bookmark"
            class="active:text-xl active:text-green-500"
          />
        </div>
        <div>
          <button type="button">
            <fa
              icon="volume-up"
              class="active:text-xl active:text-blue-500"
            />
          </button>
        </div>
      </div>
    </div>
    <div
      class=" yellow-button__box"
    >
      <button
        class="yellow-button"
        @click="pushLinkQuiz(+props.id)"
      >
        <fa icon="pencil-alt" />
        <p>تمرین لغات</p>
      </button>
    </div>
  </div>
</template>
<style>
.word-box{
  @apply bg-gray-100 even:bg-gray-300 row-span-1 rounded-lg mx-2 pr-4 font-IRANSans;
}
.list-box{
  @apply grid h-auto bg-gray-200 pt-16 gap-x-8 gap-y-2 justify-items-stretch mb-16;
}
.word-box__main{
  @apply w-auto h-14 float-right rounded-lg grid grid-rows-2 items-center;
}
.word-box__abilities{
  @apply w-28 h-14 float-left grid grid-cols-2 justify-items-center items-center;
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
</style>
