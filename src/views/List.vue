<script lang="ts" setup>
import backHeader from '../components/BackHeader.vue'

const props = defineProps<{
  id: string
}>()

</script>

<template>
  <backHeader>
    {{ props.id }}
  </backHeader>
  <div
    class="grid grid-rows-9 h-screen bg-white pt-13 gap-x-8 gap-y-2 justify-items-stretch"
  >
    <div
      v-for="n in 9"
      :key="n"
      class="bg-gray-100 even:bg-gray-300 row-span-1 rounded-lg active:-translate-y-1"
    >
      <div class="bg-transparent w-28 h-14 float-right rounded-lg grid grid-rows-2 justify-items-center items-center ">
        <div class="font-semibold">
          semibol text
        </div>
        <div class="font-light">
          light text
        </div>
      </div>
      <div class="bg-transparent w-28 h-14 float-left rounded-lg grid grid-cols-2 justify-items-center items-center">
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
      class="
      w-screen
      fixed
      inset-x-0
      bottom-0
      h-12
      font-IRANSans
      grid"
    >
      <button
        class="
        bg-yellow-500
        flex
        items-center
        justify-center
        rounded-t-2xl
        gap-x-3
      "
      >
        <fa icon="pencil-alt" />
        <p>تمرین لغات</p>
      </button>
    </div>
  </div>
</template>
