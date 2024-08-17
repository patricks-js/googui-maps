import fp from 'fastify-plugin'
import { env } from '../config/env.js'

export default fp(
  async (app) => {
    app.register(import('@fastify/jwt'), {
      secret: env.JWT_SECRET,
      sign: {
        expiresIn: env.JWT_EXPIRES_IN,
      },
    })

    app.decorate('authenticate', async (request, reply) => {
      try {
        await request.jwtVerify()
      } catch (err) {
        reply.unauthorized('Authentication failed')
      }
    })
  },
  { name: 'jwt' },
)
