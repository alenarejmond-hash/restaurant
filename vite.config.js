import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // 🚀 НАСТРОЙКА ПУТИ ДЛЯ APPSEAPRO.COM:
  // 1. Если это подпроект (например, сайт должен открываться по адресу appseapro.com/test/) — пишем '/test/'
  // 2. Если это самый ГЛАВНЫЙ репозиторий (который открывается прямо по адресу appseapro.com) — пишем '/'
  base: './', 
})