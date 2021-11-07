import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    updated (registration) {
      console.log('New content is available; please refresh.')
      document.dispatchEvent(
        new CustomEvent('swUpdated', { detail: registration })
      )
    }
  })
}
