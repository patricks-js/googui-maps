import { z } from 'zod'
import { createBestRoute } from '../../../../use-cases/routes/create-best-route.js'
import { deleteRoute } from '../../../../use-cases/routes/delete-route.js'
import { getBestRouteByMapId } from '../../../../use-cases/routes/get-best-route.js'
import {
  createRouteSchema,
  deleteRouteSchema,
  getRouteByIdSchema,
} from './schema.js'

const mapIdParamSchema = z.object({
  mapId: z.coerce.number(),
})

const mapRouteIdParamSchema = z.object({
  routeId: z.coerce.number(),
  mapId: z.coerce.number(),
})

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export default async function (app) {
  app.addHook('onRequest', app.authenticate)

  app.post('/', { schema: createRouteSchema }, async (request, reply) => {
    const { mapId } = mapIdParamSchema.parse(request.params)

    const createSchema = z.object({
      start: z.object({
        x: z.number(),
        y: z.number(),
      }),
      end: z.object({
        x: z.number(),
        y: z.number(),
      }),
      distance: z.number(), // TODO: validate distance
    })

    const data = createSchema.parse(request.body)

    const { newRoute } = await createBestRoute({ ...data, mapId })

    return reply.status(201).send({ newRoute })
  })

  app.get(
    '/:routeId',
    { schema: getRouteByIdSchema },
    async (request, reply) => {
      const { mapId } = mapIdParamSchema.parse(request.params)

      const { route } = await getBestRouteByMapId(mapId)

      return { route }
    },
  )

  app.delete(
    '/:routeId',
    { schema: deleteRouteSchema },
    async (request, reply) => {
      const { routeId, mapId } = mapRouteIdParamSchema.parse(request.params)

      await deleteRoute(routeId, mapId)

      return reply.status(204).send()
    },
  )
}
