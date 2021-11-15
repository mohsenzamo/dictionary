import { defineStore } from 'pinia'
import database, { searchType, wordType } from '../database/dexieDB'

export const useHomeLargeSearchStore = defineStore('useHomeLargeSearchStore', {
  state () {
    return {
      foundInSearchTable: null as null|searchType[],
      intersection: [] as searchType[],
      page: 0 as number,
      isFound: true as boolean,
      foundInWordsTable: null as null|wordType[],
      searchLoading: false as boolean,
      observeLoading: false as boolean,
      isObserve: false as boolean
    }
  },
  actions: {
    check (prop:number) {
      if (prop === -100) {
        for (let i = 0; i < this.foundInSearchTable!.length; i++) {
          if (this.foundInSearchTable![i].bookmark === 1) {
            this.intersection.push(this.foundInSearchTable![i])
          }
        }
      } else {
        for (let i = 0; i < this.foundInSearchTable!.length; i++) {
          if (this.foundInSearchTable![i].CategoryID === prop) {
            this.intersection.push(this.foundInSearchTable![i])
          }
        }
      }
    },
    async  search (searchQuery:any, prop:number, sub:string) {
      if (searchQuery.length > 0) {
        this.foundInSearchTable = null
        this.intersection = []
        this.page = 0
        this.isFound = true
        this.foundInWordsTable = null
        this.searchLoading = true
        this.observeLoading = false
        this.foundInSearchTable = await database.search
          .where('Word')
          .startsWith(searchQuery)
          .toArray()
        let ids
        if (sub === '1') {
          ids = this.foundInSearchTable.map(word => word.WordID)
        } else {
          if (sub === '2') {
            prop = -100
            this.check(prop)
            ids = this.intersection.map(word => word.WordID)
          } else {
            this.check(prop)
            ids = this.intersection.map(word => word.WordID)
          }
        }
        this.foundInWordsTable = await database.words
          .where('WordID')
          .anyOf(ids)
        //   .limit(10)
          .toArray()
        this.searchLoading = false
        // if (this.foundInWordsTable.length < 10) {
        //   this.observeLoading = false
        //   this.isObserve = false
        // } else {
        //   this.observeLoading = true
        //   this.isObserve = true
        // }
        if (this.foundInWordsTable.length === 0) {
        //   this.isObserve = false
        //   this.observeLoading = false
          this.isFound = false
        }
      }
    }
    // async plusPage () {
    //   this.page++
    //   const ids = this.foundInSearchTable!.map(word => word.WordID)
    //   const wordArray = await database.foundInWordsTable
    //     .where('WordID')
    //     .anyOf(ids)
    //     .offset(this.page * 10)
    //     .limit(10)
    //     .toArray()
    //   if (wordArray.length < 10) {
    //     this.observeLoading = false
    //     this.isObserve = false
    //   }
    //   this.foundInWordsTable = this.foundInWordsTable!.concat(wordArray)
    // }
  }
})
