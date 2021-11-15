import { defineStore } from 'pinia'
import database, { searchType, wordType } from '../database/dexieDB'

export const useHomeSearchStore = defineStore('useHomeSearchStore', {
  state () {
    return {
      foundInSearchTable: null as null|searchType[],
      page: 0 as number,
      isFound: true as boolean,
      foundInWordsTable: null as null|wordType[],
      searchLoading: false as boolean,
      observeLoading: false as boolean,
      isObserve: false as boolean
    }
  },
  actions: {
    async  search (searchQuery:any) {
      if (searchQuery.length > 0) {
        this.foundInSearchTable = null
        this.page = 0
        this.isFound = true
        this.foundInWordsTable = null
        this.searchLoading = true
        this.observeLoading = false
        this.foundInSearchTable = await database.search
          .where('Word')
          .startsWith(searchQuery)
          .toArray()
        const ids = this.foundInSearchTable.map(word => word.WordID)
        this.foundInWordsTable = await database.words
          .where('WordID')
          .anyOf(ids)
          .limit(10)
          .toArray()
        this.searchLoading = false
        if (this.foundInWordsTable.length <= 10) {
          this.observeLoading = false
          this.isObserve = false
        } else {
          this.observeLoading = true
          this.isObserve = true
        }
        if (this.foundInWordsTable.length === 0) {
          this.isObserve = false
          this.observeLoading = false
          this.isFound = false
        }
      }
    },
    async plusPage () {
      this.page++
      const ids = this.foundInSearchTable!.map(word => word.WordID)
      const wordArray = await database.words
        .where('WordID')
        .anyOf(ids)
        .offset(this.page * 10)
        .limit(10)
        .toArray()
      if (wordArray.length < 10) {
        this.observeLoading = false
        this.isObserve = false
      }
      this.foundInWordsTable = this.foundInWordsTable!.concat(wordArray)
    }
  }
})
