import Dexie from 'dexie'
import { defineStore } from 'pinia'
import { useCategoriesDB } from '../database/categoriesDB'
import { Categories } from '../database/dexieDB'
import { useFetchApiStore } from '../database/fetchAPI'
import { useWordsDB } from '../database/wordsDB'

export const useCreateRepo = defineStore('useCreateRepo', {
  state () {
    return {
      categroyTable: null as null | Categories[]
    }
  },
  actions: {
    async updateWordandCategory () {
      const lastUpdate = localStorage.getItem('lastUpdate') || '-1'
      useFetchApiStore().requestGet(lastUpdate).then(async table => {
        localStorage.setItem('lastUpdate', JSON.stringify(table.lastUpdate))
        useCategoriesDB().categoriesPut(table.categories)
        useCategoriesDB().categoriesGet().then(r => {
          this.categroyTable = r
        })
        useWordsDB().wordsPut(table.words)
      })
    }
  }
})
