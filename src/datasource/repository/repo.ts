import Dexie from 'dexie'
import { defineStore } from 'pinia'
import { useCategoriesDB } from '../database/categoriesDB'
import db, { Categories } from '../database/dexieDB'
import { useFetchApiStore } from '../database/fetchAPI'
import { useSearchDB } from '../database/searchDB'
import { useWordsDB } from '../database/wordsDB'

export const useCreateRepo = defineStore('useCreateRepo', {
  state () {
    return {
      categroyTable: null as null | Categories[],
      errorValue: false as boolean,
      errorLoading: true as boolean
    }
  },
  actions: {
    async updateWordandCategory () {
      const lastUpdate = localStorage.getItem('lastUpdate') || '-1'
      useFetchApiStore().requestGet(lastUpdate).then(async table => {
        db.transaction('rw', db.categories, db.words, db.search, async () => {
          await useCategoriesDB().categoriesPut(table.categories)
          await useCategoriesDB().categoriesGet().then(r => {
            this.categroyTable = r
            this.errorValue = false
            this.errorLoading = true
          })
          await useWordsDB().wordsPut(table.words)
          await useSearchDB().createSearchArray(table.words)
          localStorage.setItem('lastUpdate', JSON.stringify(table.lastUpdate))
        }).catch(() => {
          this.errorValue = true
          this.errorLoading = true
        })
      })
    }
  }
})
