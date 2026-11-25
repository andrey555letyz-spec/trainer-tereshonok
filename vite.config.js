import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    base: '/trainer-tereshonok/', // <-- Имя вашего репозитория с косыми чертами
  build: {
    outDir: 'docs' // <-- Говорим Vite собирать проект в папку docs, а не dist
  }
})

