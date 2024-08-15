import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    exclude: ['apps/desktop/*'],
    coverage: {
      provider: 'istanbul',
      reporter: ['json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': import.meta.dirname,
    },
  },
})
