<script lang="ts" setup>
import { ref } from 'vue'
import backHeader from '../components/BackHeader.vue'
import { Words } from '../datasource/database/dexieDB'
import { useWordsStore } from '../datasource/database/wordsDB'
const props = defineProps<{
  id: string
}>()
const resultW = ref<Words[] | null>(null)
useWordsStore().wordsGet(+props.id)
  .then(r => {
    resultW.value = r
  })
</script>

<template>
  <backHeader>
    {{ props.id }}
  </backHeader>
  <div
    class="list-box"
  >
    <div
      v-for="item in resultW"
      :key="item.WordID"
      class="word-box"
    >
      <div class="word-box__main">
        <div class="font-semibold">
          {{ item.Fa }}
        </div>
        <div class="font-light">
          {{ item.Ar }}
        </div>
      </div>
      <div class="word-box__abilities">
        <div>
          <fa
            icon="bookmark"
            style="color:rgb(11, 182, 11);"
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
  @apply bg-gray-100 even:bg-gray-300 row-span-1 rounded-lg active:-translate-y-1;
}
.list-box{
  @apply grid  h-screen bg-white pt-12 gap-x-8 gap-y-2 justify-items-stretch;
}
.word-box__main{
  @apply bg-transparent w-28 h-14 float-right rounded-lg grid grid-rows-2 justify-items-center items-center;
}
.word-box__abilities{
  @apply bg-transparent w-28 h-14 float-left rounded-lg grid grid-cols-2 justify-items-center items-center;
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
