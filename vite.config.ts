import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTest.js'],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['html', 'text', 'json'],
    },
  },
})
