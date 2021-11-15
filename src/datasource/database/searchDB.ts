import { defineStore } from 'pinia'
import database, { searchType, wordType } from './dexieDB'

export const useSearchStore = defineStore('useSearchStore', {
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
    async createSearchArray (array:wordType[]) {
      let allArray = [] as searchType[]
      // -------Ar-------
      for (let i = 0; i < array.length; i++) {
        const strAr = array[i].Ar
        const myAr = this.normalizeAr(strAr)
          .split(/[ -()/.=+_!~]/)
          .filter(x => x.trim())
          .map(textAr => textAr.replace(/[-()/.=+_!~{}،?؟]/, ''))
          .filter(x => x.trim())
          .map(wordAr => ({ Word: wordAr, WordID: array[i].WordID, CategoryID: array[i].CategoryID, bookmark: 0, text: 'Ar' }))
        allArray = allArray.concat(myAr)
      }
      // -------Fa-------
      for (let i = 0; i < array.length; i++) {
        const strFa = array[i].Fa
        const myFa = strFa
          .split(/[ -()/.=+_!~]/)
          .filter(y => y.trim())
          .map(textFa => textFa.replace(/[-()/.=+_!~{}،?؟]/, ''))
          .filter(y => y.trim())
          .map(wordFa => ({ Word: wordFa, WordID: array[i].WordID, CategoryID: array[i].CategoryID, bookmark: 0, text: 'Fa' }))
        allArray = allArray.concat(myFa)
      }
      // ------Ex--------
      for (let i = 0; i < array.length; i++) {
        const strEx = array[i].Example
        if (strEx.length > 0) {
          const myEx = this.normalizeAr(strEx)
            .split(/[ -()/.=+_!~]/)
            .filter(z => z.trim())
            .map(textEx => textEx.replace(/[-()/.=+_!~{}،?؟]/, ''))
            .filter(z => z.trim())
            .map(wordEx => ({ Word: wordEx, WordID: array[i].WordID, CategoryID: array[i].CategoryID, bookmark: 0, text: 'Ex' }))
          allArray = allArray.concat(myEx)
        }
      }
      // ------------------------------change-----------------------
      const lastUpdate = localStorage.getItem('lastUpdate') || '-1'
      if (lastUpdate === '-1') {
        this.putSearch(allArray)
      } else {
        for (let j = 0; j < array.length; j++) {
          await database.search.where('WordID').equals(array[j].WordID).delete()
        }
        this.putSearch(allArray)
      }
    },
    async changeSearchBookmark (id:number) {
      const getWord = await database.search.where('WordID').equals(id).toArray()
      for (let i = 0; i < getWord.length; i++) {
        if (getWord[i].bookmark === 0) {
          getWord[i].bookmark = 1
        } else {
          getWord[i].bookmark = 0
        }
      }
      database.search.bulkPut(getWord)
    },
    async putSearch (table:searchType[]) {
      await database.search.bulkPut(table)
    }
  }
})
