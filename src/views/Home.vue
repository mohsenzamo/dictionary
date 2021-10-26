<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Modal from '../components/Modal.vue'
import { useCategoriesDB } from '../datasource/database/categoriesDB'
import db, { Categories } from '../datasource/database/dexieDB'
import Loader from '../components/Loader.vue'
import { useCreateRepo } from '../datasource/repository/repo'
const result = ref<Categories[] | null>(null)

const categoryRepo = useCreateRepo()
const loading = computed(() => !categoryRepo.categroyTable || categoryRepo.categroyTable.length === 0)
const router = useRouter()
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

const words = ref()
const searchFind = ref(false)
const searchLoading = ref(false)
const searchQuery = ref('')
watchEffect(async () => {
  if (searchQuery.value.length > 0) {
    searchLoading.value = true
    await db.words
      .where('Fa')
      .startsWith(searchQuery.value)
      // .offset(40)
      .limit(40)
      .toArray(function (findList) {
        searchFind.value = true
        searchLoading.value = false
        words.value = findList
        if (findList.length === 0) {
          searchFind.value = false
        }
      })
  }
})
// -----------------------------------search---------------------------------------

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
        premium-modal__btn
      "
        >
          <p>ارتقا به نسخه طلایی</p>
        </button>
      </div>
    </modal>
  </transition>
  <Loader v-if="loading" />
  <div v-else>
    <div class="h-full pt-16">
      <div class="input-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="جستجو کنید ...."
          class="search-input"
        >
        <span
          class="search-input__submit"
        >
          <fa icon="search" />
        </span>
      </div>
      <!-- ------------------------------------- searchedWords ---------------------------------------------->
      <transition
        name="page"
        mode="out-in"
      >
        <div>
          <div
            v-if="searchQuery.length>0"
            class="grid grid-rows-9 gap-x-8 gap-y-2 justify-items-stretch w-screen mt h-full mt-14 mb-16"
          >
            <div
              v-if="searchLoading"
              class="not-find-box"
            >
              search loading
            </div>
            <!--------------------------------------- find ---------------------------------------------->
            <template v-if="searchFind">
              <div
                v-for="item in words"
                :key="item.WordID"
                class="find-box"
              >
                <div class="find-word__main">
                  <div class="font-semibold  text-base">
                    {{ item.Ar }}
                  </div>
                  <div class="font-light  text-sm">
                    {{ item.Fa }}
                  </div>
                </div>
                <div class="find-word__abilities">
                  <div>
                    <fa
                      icon="bookmark"
                      class="active:text-xl active:text-green-500"
                    />
                  </div>
                  <div>
                    <fa
                      icon="volume-up"
                      class="active:text-xl active:text-blue-500"
                    />
                  </div>
                </div>
              </div>
            </template>
            <!--------------------------------------- find ---------------------------------------------->
            <!--------------------------------------- not find ---------------------------------------------->

            <div
              v-else
              class="not-find-box"
            >
              <p class="not-find__text">
                نتیجه ای یافت نشد!
              </p>
              <br>
              <fa
                icon="frown"
                style="color: rgba(245, 158, 11) ; font-size: 32px;"
                class="animate-spin"
              />
            </div>

            <!--------------------------------------- not find ---------------------------------------------->
          </div>
          <div
            v-if="searchQuery.length<=0"
            class="home-box"
          >
            <div
              v-for="item in categoryRepo.categroyTable"
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
                class="category-box__svg"
                v-html="item.Icon"
              />
              <p>{{ item.Title }}</p>
            </div>
          </div>
        </div>
      </transition>
    <!--------------------------------------- searchedWords -------------------------------------------- -->
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
      >
        <fa icon="spell-check" />
        <p>آزمون مرحله ای</p>
      </button>
    </div>
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
  @apply bg-yellow-500 rounded-md h-8
}
.input-box{
  @apply h-11 flex fixed top-16 z-10  w-screen justify-center px-2
}
.search-input{
  @apply h-full rounded-r-full rounded-l-full pr-6 focus:outline-none focus:ring-4 ring-yellow-500 ring-opacity-50 font-IRANSans w-80 z-20
}
.search-input__submit{
  @apply z-30 h-full leading-snug font-normal text-center text-gray-500 rounded text-base flex items-center  justify-start w-12 pr-3 py-3 -mr-12
}
.find-box{
  @apply bg-gray-100 even:bg-gray-300 row-span-1 rounded-lg animate-opacity mx-2 pr-4
}
.find-word__main{
  @apply w-auto h-14 float-right rounded-lg grid grid-rows-2 items-center font-IRANSans
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
  @apply h-full flex flex-wrap gap-2 justify-center mt-14 mb-16 animate-opacity xsm:gap-4
}
.premium{
  @apply absolute bg-gray-600 w-full h-full rounded-3xl opacity-50 cursor-not-allowed
}
  .category-box {
    @apply h-24 w-24 bg-gray-300 rounded-3xl grid justify-items-center items-center text-sm text-center font-IRANSans py-3 relative  cursor-pointer;
  }
.category-box__svg{
  @apply w-8 h-8
}
.category-box__svg svg{
  width: 100% !important;
  height: 100% !important;
}
/* .category-box__svg svg path{
  fill: red;
} */
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
