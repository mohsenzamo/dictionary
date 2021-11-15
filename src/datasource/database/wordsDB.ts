import { defineStore } from 'pinia'
import database, { wordType } from './dexieDB'
import { useSearchStore } from './searchDB'

export const useWordStore = defineStore('useWordStore', {
  state () {
    return {
    }
  },
  actions: {
    async putWord (tables:wordType[]) {
      const lastUpdate = localStorage.getItem('lastUpdate') || '-1'
      if (lastUpdate === '-1') {
        for (let i = 0; i < tables.length; i++) {
          tables[i].bookmark = 0
        }
      } else {
        for (let i = 0; i < tables.length; i++) {
          const id = tables[i].WordID
          const word = await database.words.where('WordID').equals(id).toArray()
          if (word[0].bookmark === 1) {
            tables[i].bookmark = 1
          } else {
            tables[i].bookmark = 0
          }
        }
      }
      await database.words.bulkPut(tables)
      await useSearchStore().createSearchArray(tables)
    },
    async getWord (categoryId: number) {
      if (categoryId === -100) {
        const wordsresult:wordType[] = await database.words
          .where('bookmark')
          .equals(1)
          .toArray()
        return wordsresult
      } else {
        const wordsresult:wordType[] = await database.words
          .where('CategoryID')
          .equals(categoryId)
          .toArray()
        return wordsresult
      }
    },
    async getAllWords () {
      const wordsresult:wordType[] = await database.words.toArray()
      return wordsresult
    }
  }
})
