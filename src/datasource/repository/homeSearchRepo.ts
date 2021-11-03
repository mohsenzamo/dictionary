import { defineStore } from 'pinia'
import db, { Search, Words } from '../database/dexieDB'

export const useHomeSearchRepo = defineStore('useHomeSearchRepo', {
  state () {
    return {
      findList: null as null|Search[],
      intersection: [] as Search[],
      page: 0 as number,
      searchFind: true as boolean,
      words: null as null|Words[],
      searchLoading: false as boolean,
      listLoading: false as boolean,
      observeValue: false as boolean
    }
  },
  actions: {
    async  search (searchQuery:any) {
      if (searchQuery.length > 0) {
        this.findList = null
        this.page = 0
        this.searchFind = true
        this.words = null
        this.searchLoading = true
        this.listLoading = false
        this.findList = await db.search
          .where('Word')
          .startsWith(searchQuery)
          .toArray()
        const ids = this.findList.map(word => word.WordID)
        this.words = await db.words
          .where('WordID')
          .anyOf(ids)
          .limit(10)
          .toArray()
        this.searchLoading = false
        if (this.words.length < 10) {
          this.listLoading = false
          this.observeValue = false
        } else {
          this.listLoading = true
          this.observeValue = true
        }
        if (this.words.length === 0) {
          this.observeValue = false
          this.listLoading = false
          this.searchFind = false
        }
      }
    },
    async pages () {
      this.page++
      const ids = this.findList!.map(word => word.WordID)
      const wordArray = await db.words
        .where('WordID')
        .anyOf(ids)
        .offset(this.page * 10)
        .limit(10)
        .toArray()
      if (wordArray.length < 10) {
        this.listLoading = false
        this.observeValue = false
      }
      this.words = this.words!.concat(wordArray)
    }
  }
})
