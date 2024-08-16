import mongoose from 'mongoose'

import { app } from './config/app.js'
import { env } from './config/env.js'

const port = env.PORT
const host = '0.0.0.0'

try {
  await mongoose.connect(env.DATABASE_URL)
  console.info('🔥 Connected to MongoDB')

  await app.listen({ port, host })
  console.info(
    `🚀 HTTP Server Running! Docs available at http://${host}:${port}/docs`,
  )
} catch (err) {
  console.error(err)
  process.exit(1)
}
