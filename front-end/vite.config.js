import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://d8jzn23n-3000.eun1.devtunnels.ms/',
        changeOrigin: true
      }
    }
  }
})
