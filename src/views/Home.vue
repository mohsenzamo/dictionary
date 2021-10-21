<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Modal from '../components/Modal.vue'
import { useCategoriesStore } from '../datasource/database/categoriesDB'
import { Categories } from '../datasource/database/dexieDB'
const result = ref<Categories[] | null>(null)
const loading = ref(true)
useCategoriesStore().categoriesGet()
  .then(r => {
    result.value = r
    console.log(result.value)
  })
  .catch((err) => {

  })
  .finally(() => { loading.value = false })

// const loadingValue = ref(true)
// store.request()
//   .then(res => {

//   })
//   .finally(() => loading.v)
// loadingValue.value = false
const router = useRouter()
const lockValue = ref(false)
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
function pushLink (link:string) {
  router.push({
    name: link
  })
}
const modalPremiumValue = ref(false)
function change () {
  lockValue.value = !lockValue.value
}
function submit () {
  alert('mohsen')
}

// -----------------------------------search---------------------------------------
const searchQuery = ref('')
const words = [
  { id: 1, title: 'ali' },
  { id: 2, title: 'hassan' },
  { id: 3, title: 'alireza' },
  { id: 4, title: 'behzad' },
  { id: 5, title: 'behnam' }
]

// -----------------------------------search---------------------------------------

</script>

<template>
  <Header />
  <transition name="modal">
    <modal
      v-if="modalPremiumValue"
      @close="modalPremiumValue = false"
    >
      <div class="premium-modal__box">
        <p class="">
          برای استفاده از این قسمت باید نرم افزار را به نسخه طلایی ارتقا دهید.<br>با دریافت نسخه طلایی نرم افزار، امکان دسترسی به هزاران لغت در دسته بندی های مختلف را خواهید داشت.
        </p>
        <button
          class="
        preimuim-modal__btn
      "
        >
          <p>ارتقا به نسخه طلایی</p>
        </button>
      </div>
    </modal>
  </transition>
  <div
    v-if="loading"
    class="h-screen w-screen bg-white z-40 fixed"
  >
    loading
  </div>
  <div class="h-full pt-16">
    <div class="input-box">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="جستجو کنید ...."
        class="search-input"
        @keyup.enter="submit"
      >
      <span
        class="search-input__submit"
        @click="submit"
      >
        <fa icon="search" />
      </span>
    </div>
    <!-- ------------------------------------- searchedWords ---------------------------------------------->
    <transition
      name="page"
      mode="out-in"
    >
      <div
        v-if="searchQuery.length>0"
        class="grid grid-rows-9 bg-white  gap-x-8 gap-y-2 justify-items-stretch fixed z-10 w-screen top-28 h-full "
      >
        <!--------------------------------------- find ---------------------------------------------->
        <template v-if="searchQuery.length<3">
          <div
            v-for="n in 9"
            :key="n"
            class="find-box"
          >
            <div class="find-word__main">
              <div class="font-semibold">
                semibol text
              </div>
              <div class="font-light">
                light text
              </div>
            </div>
            <div class="find-word__abilities">
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
        </template>
        <!--------------------------------------- find ---------------------------------------------->
        <!--------------------------------------- not find ---------------------------------------------->

        <div
          v-if="searchQuery.length>=3"
          class="not-find-box"
        >
          <p class="not-find__text">
            نتیجه ای یافت نشد!
          </p>
          <br>
          <fa
            icon="frown"
            style="color: rgba(245, 158, 11) ; font-size: 32px;"
          />
        </div>

        <!--------------------------------------- not find ---------------------------------------------->
      </div>
    </transition>
    <!--------------------------------------- searchedWords -------------------------------------------- -->

    <div class="home-box">
      <div
        v-for="item in result"
        :key="item.CategoryID"
        class="category-box"
        @click="pushLinkList('List',item.Title,item.CategoryID,item.IsFree)"
      >
        <div
          v-if="item.IsFree === 0"
          class="premium"
          @click="modalPremiumValue = true"
        >
          <fa
            icon="lock"
            class="absolute top-2 right-2 text-yellow-500"
          />
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div
          v-if="item.Icon"
          class="w-10"
          v-html="item.Icon"
        />
        <p>{{ item.Title }}</p>
      </div>
    </div>
  </div>

  <div
    class="
      yellow-btns-box"
  >
    <button
      class="
        yellow-btns
      "
      @click="pushLink('Quiz')"
    >
      <fa icon="pencil-alt" />
      <p>تمرین لغات</p>
    </button>
    <button
      class="
        yellow-btns
      "
      @click="change"
    >
      <fa icon="spell-check" />
      <p>آزمون مرحله ای</p>
    </button>
  </div>
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
.premium-modal__box{
  @apply grid font-IRANSans text-sm gap-4
}
.premium-modal__btn{
  @apply bg-yellow-500
        rounded-md
        h-8
}
.input-box{
  @apply h-11 flex fixed top-16 z-10  w-screen justify-center
}
.search-input{
  @apply h-full rounded-r-full rounded-l-full pr-6 focus:outline-none focus:ring-4 ring-yellow-500 ring-opacity-50 font-IRANSans w-80 z-20
}
.search-input__submit{
  @apply z-30 h-full leading-snug font-normal text-center text-gray-500 rounded text-base flex items-center  justify-start w-12 pr-3 py-3 -mr-12
}
.find-box{
  @apply bg-gray-100 even:bg-gray-300 row-span-1 rounded-lg active:-translate-y-1
}
.find-word__main{
  @apply bg-transparent w-28 h-14 float-right rounded-lg grid grid-rows-2 justify-items-center items-center
}
.find-word__abilities{
  @apply bg-transparent w-28 h-14 float-left rounded-lg grid grid-cols-2 justify-items-center items-center
}
.not-find-box{
  @apply bg-gray-200 h-screen w-screen text-center animate-opacity
}
.not-find__text{
  @apply font-IRANSans pt-16 text-xl
}
.home-box{
  @apply h-full flex flex-wrap gap-4 justify-center mt-14 mb-16
}
.premium{
  @apply absolute bg-gray-600 w-full h-full rounded-3xl opacity-50 cursor-not-allowed
}
.yellow-btns-box{
  @apply w-screen
      fixed
      inset-x-0
      bottom-0
      h-12
      grid grid-cols-2
      font-IRANSans
      gap-x-2

}
.yellow-btns{
  @apply bg-yellow-500
        flex
        items-center
        justify-center
        rounded-t-2xl
        gap-x-3
}
</style>
