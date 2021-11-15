import { defineStore } from 'pinia'
import database, { categoryType } from './dexieDB'

export const useCategoryStore = defineStore('useCategoryStore', {
  state () {
    return {
    }
  },
  actions: {
    async putCategory (catsArray:categoryType[]) {
      await database.categories.bulkPut(catsArray)
    },
    async getCategory () {
      const catsResult:categoryType[] = await database.categories.orderBy('CustomOrder').toArray()
      return catsResult
    }
  }
})
