import { defineStore } from 'pinia'
import db, { Words } from './dexieDB'
import { useSearchDB } from './searchDB'

export const useWordsDB = defineStore('useWordsDB', {
  state () {
    return {
    }
  },
  actions: {
    async wordsPut (tables:Words[]) {
      const lastUpdate = localStorage.getItem('lastUpdate') || '-1'
      if (lastUpdate === '-1') {
        for (let i = 0; i < tables.length; i++) {
          tables[i].bookmark = 0
        }
      } else {
        for (let i = 0; i < tables.length; i++) {
          const id = tables[i].WordID
          const word = await db.words.where('WordID').equals(id).toArray()
          if (word[0].bookmark === 1) {
            tables[i].bookmark = 1
          } else {
            tables[i].bookmark = 0
          }
        }
      }
      await db.words.bulkPut(tables)
      await useSearchDB().createSearchArray(tables)
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
