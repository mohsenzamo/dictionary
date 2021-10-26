<script lang="ts" setup>
import { ref } from 'vue'
import { useCreateRepo } from './datasource/repository/repo'
const errorShow = ref(false)
const errorLoading = ref(true)
useCreateRepo().updateWordandCategory().catch(er => {
  errorShow.value = true
}).finally(() => {
  errorShow.value = false
})
function err () {
  useCreateRepo().updateWordandCategory().catch(er => {
    errorLoading.value = false
  }).finally(() => {
    errorShow.value = false
    errorLoading.value = true
  })
}
</script>
<template>
  <div
    v-if="errorShow"
    class="bg-red-300 h-screen w-screen grid justify-items-center gap-3"
  >
    <p class="self-end font-Yekan text-2xl font-semibold animate-bounce">
      تلاش مجدد!
    </p>
    <button
      class="bg-yellow-500 self-start w-24 rounded-lg h-8"
      @click="err"
    >
      <transition
        name="error"
        mode="out-in"
      >
        <fa
          v-if="errorLoading"
          icon="arrow-down"
        />
        <span
          v-else
          class="errorLoader"
        />
      </transition>
    </button>
  </div>
  <router-view
    v-else
    v-slot="{ Component, route }"
  >
    <transition
      name="page"
      mode="out-in"
    >
      <div
        :key="route.path"
        class="bg-gray-200"
      >
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.error-enter-active,
.error-leave-active {
  transition: all 0.3s ease;
}

.error-enter-from,
.error-leave-to {
  opacity: 0;
  transform: translateY(50%);
}

.errorLoader {
  margin-left: 24px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  color: rgb(39, 37, 37);
  animation: errorLoader 1s linear infinite alternate;
}
@keyframes errorLoader {
  0% {
    box-shadow: -38px -6px, -14px 6px, 14px -6px;
  }
  33% {
    box-shadow: -38px 6px, -14px -6px, 14px 6px;
  }
  66% {
    box-shadow: -38px -6px, -14px 6px, 14px -6px;
  }
  100% {
    box-shadow: -38px 6px, -14px -6px, 14px 6px;
  }
}
</style>
