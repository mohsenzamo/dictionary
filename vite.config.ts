import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    strategies: 'injectManifest',
    filename: 'serviceWorker.ts',
    srcDir: 'src/datasource/repository',
    includeAssets: [
      '**/*.js',
      '**/*.ttf'
    ],
    manifest: {
      background_color: '#c9c7c1',
      description: 'دیکشنری جامع عربی به فارسی',
      display: 'standalone',
      name: 'دیکشنری عربی نبراس',
      short_name: 'دیکشنری',
      start_url: '/',
      theme_color: '#cc8f00',
      icons: [
        {
          src: '/favicon/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/favicon/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
  server: {
    proxy: {
      '/api': 'http://nebrasar.ir'
    }
  }
})
