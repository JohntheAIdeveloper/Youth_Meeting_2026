import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Env-driven base path: '/' on Vercel root, or '/Youth_Meeting_2026/' on GitHub Pages
  base: process.env.VITE_BASE ?? '/',
})
