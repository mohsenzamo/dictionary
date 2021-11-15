import { defineStore } from 'pinia'
export const usePWAStore = defineStore('usePWAStore', {
  state () {
    return {
      showIntallation: false as boolean,
      installPrompt: null as any
    }
  },
  actions: {
    beforeInstall () {
      window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault()
        this.installPrompt = e
        this.showIntallation = true
      })
    },
    showPromotion () {
      this.installPrompt.prompt()
    }
  }
})
