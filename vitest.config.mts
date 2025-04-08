import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.test' })

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,           // This enables global access to test utilities like expect
    environment: 'jsdom',    // Use jsdom for DOM-related tests
    setupFiles: ['./vitest.setup.ts'],
  },
})