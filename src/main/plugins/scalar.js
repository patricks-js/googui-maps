import fastifyScalar from '@scalar/fastify-api-reference'
import fastifyPlugin from 'fastify-plugin'

export const scalarUi = fastifyPlugin(async (app) => {
  app.register(fastifyScalar, {
    routePrefix: '/docs',
    configuration: {
      spec: {
        content: () => app.swagger(),
      },
    },
  })
})
