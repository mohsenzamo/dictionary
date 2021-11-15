import { defineStore } from 'pinia'
import { categoryType, wordType } from './dexieDB'

const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://nebrasar.ir/api' : '/api'

export const useFetchApiStore = defineStore('useApiStore', {
  state () {
    return {
    }
  },
  actions: {
    async getRequest (lastUpdate:string) {
      type Output = {
        lastUpdate: number
        words: wordType[]
        categories: categoryType[]
      }
      const res = await fetch(BASE_URL + '/getUpdates.php?variant=normal&lastUpdate=' + lastUpdate)
      const tables: Output = await res.json()
      return tables
    }

  }
})
