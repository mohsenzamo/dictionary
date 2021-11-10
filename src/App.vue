<script lang="ts" setup>
import { computed } from 'vue'
import { useCreateRepo } from './datasource/repository/repo'
import Modal from './components/Modal.vue'
import { useServiceWorker } from './registerServiceWorker'
const serviceWorker = useServiceWorker()
const errorShow = computed(() => useCreateRepo().errorValue)
const errorLoading = computed(() => useCreateRepo().errorLoading)
useCreateRepo().updateWordandCategory()
function err () {
  useCreateRepo().updateWordandCategory().then(() => {
    useCreateRepo().errorLoading = false
  })
}
const updateExists = computed(() => serviceWorker.updateAvailable)
serviceWorker.registerServiceWorker()

</script>
<template>
  <transition name="modal">
    <modal
      v-if="updateExists"
      @close="updateExists = false"
    >
      <div class="grid items-center justify-items-center">
        <p class="font-IRANSans w-2/3 text-center">
          بروزرسانی جدید موجود است
        </p>
        <button
          class="bg-yellow-500 rounded-md h-10 font-IRANSans text-sm px-2 mt-3"
          @click="serviceWorker.refreshApp()"
        >
          <span class="animate-pulse">
            بروزرسانی کنید
          </span>
        </button>
      </div>
    </modal>
  </transition>
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
</style>
