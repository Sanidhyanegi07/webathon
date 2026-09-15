import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth', 'firebase/analytics'],
          'vendor-ui': ['lucide-react', 'canvas-confetti', 'clsx', 'tailwind-merge'],
        }
      }
    }
  }
})
