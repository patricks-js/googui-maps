import { join } from 'node:path'
import fastify from 'fastify'
import { errorHandler } from './error-handler.js'

export const app = fastify()

app.register(import('@fastify/autoload'), {
  dir: join(import.meta.dirname, '..', 'plugins'),
})

// app.register(fastifyAutoload, {
//   dir: join(_dirname, '..', 'routes'),
//   options: { prefix: '/api' },
// })

app.setErrorHandler(errorHandler)
