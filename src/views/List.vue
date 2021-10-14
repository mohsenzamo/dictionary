<template>
  <div
    class="grid grid-rows-9 h-screen bg-white pt-16 gap-x-8 gap-y-2 justify-items-stretch"
  >
    <div class="bg-white w-screen rounded-b-lg h-8">
      <div>
        <fa
          icon="arrow-right"
        />
      </div>
    </div>
    <div
      v-for="n in 9"
      :key="n"
      class="bg-gray-200 row-span-1 rounded-lg active:-translate-y-1"
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
            style="color:rgb(18, 156, 18);"
          />
        </div>
        <div>
          <fa
            icon="volume-off"
          />
        </div>
      </div>
    </div>
    <div class="fixed bottom-0 bg-yellow-400 h-16 w-screen rounded-t-lg" />
  </div>
</template>
