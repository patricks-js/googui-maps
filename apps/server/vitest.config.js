import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['json', 'html'],
      exclude: [
        '**/config/**',
        '**/models/**',
        '**/db/**',
        '**/main/**',
        '**/middlewares/**',
        '**/plugins/**',
      ],
    },
  },
})
