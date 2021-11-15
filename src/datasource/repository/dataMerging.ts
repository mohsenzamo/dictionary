import { defineStore } from 'pinia'
import { useCategoryStore } from '../database/categoriesDB'
import database, { categoryType } from '../database/dexieDB'
import { useFetchApiStore } from '../database/fetchAPI'
import { useWordStore } from '../database/wordsDB'

export const useMergeDataStore = defineStore('useMergeDataStore', {
  state () {
    return {
      categroyArray: null as null | categoryType[],
      errored: false as boolean,
      errorLoading: true as boolean
    }
  },
  actions: {
    async fillDatabaseTables () {
      const lastUpdate = localStorage.getItem('lastUpdate') || '-1'
      useFetchApiStore().getRequest(lastUpdate).then(async table => {
        database.transaction('rw', database.categories, database.words, database.search, async () => {
          await useCategoryStore().putCategory(table.categories)
          await useCategoryStore().getCategory().then(r => {
            this.categroyArray = r
            this.errored = false
            this.errorLoading = true
          })
          await useWordStore().putWord(table.words)
          localStorage.setItem('lastUpdate', JSON.stringify(table.lastUpdate))
        }).catch(() => {
          this.errored = true
          this.errorLoading = true
        })
      })
    }
  }
})
