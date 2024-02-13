import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // ตั้งค่าให้ Vite proxy ไปที่เซิร์ฟเวอร์ Express
        ws: true, // เปิดใช้งาน WebSockets
      },
    },
  },
})
