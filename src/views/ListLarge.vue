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
const props = defineProps<{
  id: string
}>()
const loading = ref(true)
const resultW = ref<Words[] | null>(null)
const emptyBookmark = ref(false)
useWordsDB().wordsGet(+props.id)
  .then(x => {
    resultW.value = x
  }).finally(() => {
    loading.value = false
  })
const router = useRouter()
</script>

<template>
  <HeaderLarge />
  <loader v-if="loading" />
  <template v-else>
    <div
      v-for="item in resultW"
      :key="item.WordID"
    >
      {{ item.Ar }}
    </div>
  </template>
</template>
<style>

</style>
