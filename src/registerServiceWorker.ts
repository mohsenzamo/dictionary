import { register } from 'register-service-worker'
import { defineStore } from 'pinia'

export const useServiceWorker = defineStore('useServiceWorker', {
  state () {
    return {
      updateAvailable: false as boolean
    }
  },
  actions: {
    registerServiceWorker () {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload()
      })
      if (process.env.NODE_ENV === 'production') {
        register('/workBox.js', {
          updated (registration) {
            document.dispatchEvent(
              new CustomEvent('swUpdated', { detail: registration })
            )
          },
          registered: async (swr) => {
            await new Promise(resolve => setTimeout(resolve, 0))
            swr.addEventListener('updatefound', () => {
              swr.installing?.addEventListener('statechange', () => {
                if (swr.waiting) {
                  this.updateAvailable = true
                }
              })
            })
          },
          updatefound: (reg) => {
          }
        })
      }
    },
    async refreshApp () {
      const swr = await navigator.serviceWorker.getRegistration()
      swr?.waiting?.postMessage({ type: 'SKIP_WAITING' })
      this.updateAvailable = false
    }
  }
})
