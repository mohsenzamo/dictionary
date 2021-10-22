<script lang="ts" setup>
import { ref } from 'vue'
import backHeader from '../components/BackHeader.vue'
import { Words } from '../datasource/database/dexieDB'
import { useWordsDB } from '../datasource/database/wordsDB'
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
</script>

<template>
  <backHeader>
    {{ props.title }}
  </backHeader>

  <div
    v-if="loading"
    class="h-screen w-full bg-red-500 text-center grid items-center"
  >
    loading
  </div>
  <div
    v-else
    class="list-box"
  >
    <loader>
      sa
    </loader>
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
        <div>
          <fa
            icon="bookmark"
          />
        </div>
        <div>
          <fa
            icon="volume-off"
          />
        </div>
      </div>
    </div>
    <div
      class=" yellow-button__box"
    >
      <button
        class="yellow-button"
      >
        <fa icon="pencil-alt" />
        <p>تمرین لغات</p>
      </button>
    </div>
  </div>
</template>
<style>
.word-box{
  @apply bg-gray-100 even:bg-gray-300 row-span-1 rounded-lg active:-translate-y-1 mx-2 pr-4 font-IRANSans active:shadow-xl;
}
.list-box{
  @apply grid h-screen bg-gray-200 pt-16 gap-x-8 gap-y-2 justify-items-stretch;
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
