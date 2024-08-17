import { join } from 'node:path'
import autoload from '@fastify/autoload'
import fastify from 'fastify'
import { errorHandler } from './error-handler.js'

export const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
})

const srcDir = join(import.meta.dirname, '..')

app.register(autoload, {
  dir: join(srcDir, 'plugins'),
})

app.register(autoload, {
  dir: join(srcDir, 'routes'),
  options: { prefix: '/api' },
  routeParams: true,
  ignorePattern: /^.*(?:test|spec).js$/,
})

app.setErrorHandler(errorHandler)
