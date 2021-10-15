<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store/index'
import Modal from '../components/Modal.vue'
const router = useRouter()
const store = useStore()
const modalMenuValue = ref(false)
</script>
<template>
  <div
    class="
      grid grid-cols-4
      items-center
      h-14
      justify-items-center
      header-shadow
      fixed
      w-screen
      bg-white
      inset-x-0
      top-0
      z-10
    "
  >
    <span
      class="text-xl"
      @click="modalMenuValue = true"
    ><fa icon="align-justify" /></span>
    <div class="grid items-center justify-items-center col-span-2">
      <p class="text-base font-black font-IRANSans">
        دیکشنری عربی نبراس
      </p>
      <p class="text-sm font-Yekan">
        لهجه <span class="bg-gray-300 rounded-lg px-1"> عراقی</span> و
        <span class="px-1 bg-gray-300 rounded-lg">خلیجی</span>
      </p>
    </div>
    <router-link
      to="/"
    >
      <img
        alt="Vue logo"
        src="../assets/logo.png"
        class="h-12"
      >
    </router-link>
  </div>
  <transition name="modal">
    <modal
      v-if="modalMenuValue"
      @close="modalMenuValue = false"
    >
      <template #header>
        <h3>menu header</h3>
      </template>
    </modal>
  </transition>
</template>
