/* global process */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vercel serves the site from the root (it sets VERCEL during its builds); GitHub Pages serves it under /T4OHIO/
  base: process.env.VITE_BASE_PATH || (process.env.VERCEL ? "/" : "/T4OHIO/"),
})
