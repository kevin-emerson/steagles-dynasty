import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/steagles-dynasty/",
  plugins: [react()],
})
