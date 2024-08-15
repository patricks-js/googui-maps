import fastifyCors from '@fastify/cors'
import fastifyPlugin from 'fastify-plugin'

export const cors = fastifyPlugin(async (app) => {
  app.register(fastifyCors, {
    origin: '*',
  })
})
