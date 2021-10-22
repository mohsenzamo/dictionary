import { defineStore } from 'pinia'
import { Categories, Words } from './dexieDB'

export const useFetchApiStore = defineStore('useApiStore', {
  state () {
    return {
    }
  },
  actions: {
    async request () {
      type Output = {
        lastUpdate: number
        words: Words[]
        categories: Categories[]
      }
      const res = await fetch('/api/getUpdates.php?variant=normal&lastUpdate=-1')
      const tables: Output = await res.json()
      return tables
    }

  }
})
