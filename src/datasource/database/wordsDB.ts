import { defineStore } from 'pinia'
import db, { Words } from './dexieDB'

export const useWordsDB = defineStore('useWordsDB', {
  state () {
    return {
    }
  },
  actions: {
    async wordsPut (tables:Words[]) {
      // tables.map(item => item.bookmark=0)
      for (let i = 0; i < tables.length; i++) {
        tables[i].bookmark = 0
      }
      await db.words.bulkPut(tables)
    },
    async wordsGet (categoryId: number) {
      if (categoryId === -100) {
        const wordsresult:Words[] = await db.words
          .where('bookmark')
          .equals(1)
          .toArray()
        return wordsresult
      } else {
        const wordsresult:Words[] = await db.words
          .where('CategoryID')
          .equals(categoryId)
          .toArray()
        return wordsresult
      }
    },
    async wordsGetAll () {
      const wordsresult:Words[] = await db.words.toArray()
      return wordsresult
    }
  }
})
