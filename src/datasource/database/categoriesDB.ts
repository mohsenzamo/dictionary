import { defineStore } from 'pinia'
import db, { Categories } from './dexieDB'

export const useCategoriesStore = defineStore('useCategoriesStore', {
  state () {
    return {
    }
  },
  actions: {
    async categoriesPut (tables:Categories[]) {
      await db.categories.bulkPut(tables)
    },
    async categoriesGet () {
      const categoriesresult:Categories[] = await db.categories.orderBy('CustomOrder').toArray()
      return categoriesresult
    }
  }
})
