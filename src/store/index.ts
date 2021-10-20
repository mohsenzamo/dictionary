import { defineStore } from 'pinia'
import db from '../database/dexieDB'
export const useStore = defineStore('main', {
  state () {
    return {
      modalValueClose: 0,
      modalValueOpen: 1
    }
  },
  actions: {
    async request () {
      type Output = {
        lastUpdate: number
        words: []
        categories: []
      }
      const res = await fetch('/api/getUpdates.php?variant=normal&lastUpdate=-1')
      const tables: Output = await res.json()
      db.categories.bulkPut(tables.categories)
      db.words.bulkPut(tables.words)
    }

  }
})
