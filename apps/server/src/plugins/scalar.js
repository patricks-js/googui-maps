import fp from 'fastify-plugin'

export default fp(
  async (app) => {
    app.register(import('@scalar/fastify-api-reference'), {
      routePrefix: '/docs',
      configuration: {
        spec: {
          content: () => app.swagger(),
        },
      },
    })
  },
  { name: 'scalar' },
)
