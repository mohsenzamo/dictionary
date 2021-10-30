import { defineStore } from 'pinia'
import db, { Search, Words } from './dexieDB'

export const useSearchDB = defineStore('useSearchDB', {
  state () {
    return {
    }
  },
  actions: {
    normalizeAr (text:string) {
      text = text.replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g, '')
      text = text.replace(/(آ|إ|أ)/g, 'ا')
      text = text.replace(/(ة)/g, 'ه')
      text = text.replace(/(ئ|ؤ)/g, 'ء')
      text = text.replace(/(ى)/g, 'ي')
      const starter = 0x660
      for (let i = 0; i < 10; i++) {
        text.replace(String.fromCharCode(starter + i), String.fromCharCode(48 + i))
      }
      return text
    },
    async createSearchArray (array:Words[]) {
      let allArray = [] as Search[]
      // -------Ar-------
      for (let i = 0; i < array.length; i++) {
        const strAr = array[i].Ar
        const myAr = strAr
          .split(/[ /()]/)
          .filter(x => x.trim())
          .map(wordAr => ({ Word: this.normalizeAr(wordAr), WordID: array[i].WordID, text: 'Ar' }))

        allArray = allArray.concat(myAr)
      }
      // -------Fa-------
      for (let i = 0; i < array.length; i++) {
        const strFa = array[i].Fa
        const myFa = strFa
          .split(/[ /()]/)
          .filter(y => y.trim())
          .map(wordFa => ({ Word: wordFa, WordID: array[i].WordID, text: 'Fa' }))
        allArray = allArray.concat(myFa)
      }
      // ------Ex--------
      for (let i = 0; i < array.length; i++) {
        const strEx = array[i].Example
        if (strEx.length > 0) {
          const myEx = strEx
            .split(/[ /()]/)
            .filter(z => z.trim())
            .map(wordEx => ({ Word: this.normalizeAr(wordEx), WordID: array[i].WordID, text: 'Ex' }))
          allArray = allArray.concat(myEx)
        }
      }
      this.searchPut(allArray)
    },
    async searchPut (table:Search[]) {
      await db.search.bulkPut(table)
    }
  }
})
