import Dexie from 'dexie'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCategoriesDB } from '../database/categoriesDB'
import { Categories } from '../database/dexieDB'
import { useFetchApiStore } from '../database/fetchAPI'
import { useWordsDB } from '../database/wordsDB'

export const useCreateRepo = defineStore('useCreateRepo', {
  state () {
    return {
    }
  },
  actions: {
    async createRepo () {
      await Dexie.exists('MyAppDatabase').then(async function (exists) {
        if (exists) {
          console.log('Database exists')
        } else {
          await useFetchApiStore().request().then(async table => {
            localStorage.setItem('lastUpdate', JSON.stringify(table.lastUpdate))
            await useCategoriesDB().categoriesPut(table.categories)
            await useWordsDB().wordsPut(table.words)
          })
        }
      })
    }
  }
})
