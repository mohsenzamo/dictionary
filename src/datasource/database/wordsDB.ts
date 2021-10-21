import { defineStore } from 'pinia'
import db, { Words } from './dexieDB'

export const useWordsStore = defineStore('useWordsStore', {
  state () {
    return {
    }
  },
  actions: {
    async wordsPut (tables:Words[]) {
      await db.words.bulkPut(tables)
    },
    async wordsGet (categoryId: number) {
      const wordsresult:Words[] = await db.words
        .where('CategoryID')
        .equals(categoryId)
        .toArray()
      return wordsresult
    }
  }
})
