import { defineStore } from 'pinia'
export const usePWAStore = defineStore('usePWAStore', {
  state () {
    return {
      showValue: false as boolean,
      installPrompt: null as any
    }
  },
  actions: {
    beforeInstall () {
      window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault()
        this.installPrompt = e
        this.showValue = true
      })
    },
    showPromotion () {
      this.installPrompt.prompt()
    }
  }
})
