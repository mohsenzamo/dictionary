import { defineStore } from 'pinia'
import db, { Categories } from './dexieDB'

export const useCategoriesDB = defineStore('useCategoriesDB', {
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
