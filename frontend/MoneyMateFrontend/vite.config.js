import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from "tailwindcss"


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open : true
  }
  
})

