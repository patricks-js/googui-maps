import { defineConfig } from 'drizzle-kit'
import { env } from './src/config/env.js'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/index.js',
  out: './src/db/migrations',
  strict: true,
  verbose: true,
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
