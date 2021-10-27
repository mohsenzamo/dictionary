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
      const allArray = []
      // -------Ar-------
      for (let i = 0; i < array.length; i++) {
        const strAr = array[i].Ar
        const myAr1 = strAr.split(' ')
        for (let j = 0; j < myAr1.length; j++) {
          const myAr2 = myAr1[j].split('/')
          for (let k = 0; k < myAr2.length; k++) {
            if (myAr2[k].length > 0 || myAr2[k] !== '' || myAr2[k] !== '(' || myAr2[k] !== ')') {
              const objectAr = { Word: this.normalizeAr(myAr2[k]), WordID: array[i].WordID, text: 'Ar' }
              allArray.push(objectAr)
            }
          }
        }
      }
      // -------Fa-------
      for (let i = 0; i < array.length; i++) {
        const strFa = array[i].Fa
        const myFa1 = strFa.split(' ')
        for (let j = 0; j < myFa1.length; j++) {
          const myFa2 = myFa1[j].split('/')
          for (let k = 0; k < myFa2.length; k++) {
            if (myFa2[k].length > 0 || myFa2[k] !== '' || myFa2[k] !== '(' || myFa2[k] !== ')') {
              const objectFa = { Word: myFa2[k], WordID: array[i].WordID, text: 'Fa' }
              allArray.push(objectFa)
            }
          }
        }
      }
      // ------Ex--------
      for (let i = 0; i < array.length; i++) {
        const strEx = array[i].Example
        if (strEx.length > 0) {
          const myEx1 = strEx.split(' ')
          for (let j = 0; j < myEx1.length; j++) {
            const myEx2 = myEx1[j].split('/')
            for (let k = 0; k < myEx2.length; k++) {
              if (myEx2[k].length > 0 || myEx2[k] !== '' || myEx2[k] !== '(' || myEx2[k] !== ')') {
                const objectEx = { Word: this.normalizeAr(myEx2[k]), WordID: array[i].WordID, text: 'Ex' }
                allArray.push(objectEx)
              }
            }
          }
        }
      }
      console.log(allArray)
      this.searchPut(allArray)
    },
    async searchPut (table:Search[]) {
      await db.search.bulkPut(table)
    }
  }
})
