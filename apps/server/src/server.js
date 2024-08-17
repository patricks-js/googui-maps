import mongoose from 'mongoose'

import { app } from './config/app.js'
import { env } from './config/env.js'

const port = env.PORT
const host = '0.0.0.0'

try {
  await mongoose.connect(env.MONGODB_URL)

  await app.listen({ port, host })
  app.log.info(`Docs available at http://${host}:${port}/docs`)
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
