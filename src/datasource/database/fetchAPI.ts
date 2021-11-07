import { defineStore } from 'pinia'
import { Categories, Words } from './dexieDB'

const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://nebrasar.ir/api' : '/api'

export const useFetchApiStore = defineStore('useApiStore', {
  state () {
    return {
    }
  },
  actions: {
    async requestGet (lastUpdate:string) {
      type Output = {
        lastUpdate: number
        words: Words[]
        categories: Categories[]
      }
      const res = await fetch(BASE_URL + '/getUpdates.php?variant=normal&lastUpdate=' + lastUpdate)
      const tables: Output = await res.json()
      return tables
    }

  }
})
