import fp from 'fastify-plugin'

export default fp(
  async (app) => {
    app.register(import('fastify-print-routes'))
  },
  { name: 'print-routes' },
)
