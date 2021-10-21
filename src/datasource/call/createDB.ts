import { defineStore } from 'pinia'
import { useCategoriesStore } from '../database/categoriesDB'
import { useApiStore } from '../database/fetchAPI'
import { useWordsStore } from '../database/wordsDB'

export const useCreateDB = defineStore('useCreateDB', {
  state () {
    return {
    }
  },
  actions: {
    async putDB () {
      const tables = await useApiStore().request()
      useCategoriesStore().categoriesPut(tables.categories)
      useWordsStore().wordsPut(tables.words)
    }
  }
})
