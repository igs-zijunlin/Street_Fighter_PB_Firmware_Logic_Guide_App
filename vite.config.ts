import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Street_Fighter_PB_Firmware_Logic_Guide_App/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
