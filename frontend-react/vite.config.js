import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    host: true, // Listen on all local IPs
    proxy: {
      '/api': {
        target: 'http://localhost:8082',
        changeOrigin: true,
      }
    }
  },
  preview: {
    port: 3000,
    host: true, // Listen on all local IPs for mobile testing
    proxy: {
      '/api': {
        target: 'http://localhost:8082',
        changeOrigin: true,
      }
    }
  }
})
