import { defineStore } from 'pinia'
export const useStore = defineStore('main', {
  state () {
    return {
      propId: -10 as number,
      propTitle: '' as string
    }
  }
})
