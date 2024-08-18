import { z } from 'zod'
import { createMap } from '../../use-cases/maps/create-map.js'
import { getMapById } from '../../use-cases/maps/get-map-by-id.js'

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export default async function (app) {
  app.addHook('onRequest', app.authenticate)

  app.get('/:mapId', async (request, reply) => {
    const paramsSchema = z.object({
      mapId: z.coerce.number(),
    })

    const { mapId } = paramsSchema.parse(request.params)

    return getMapById(mapId)
  })

  app.post('/', async (request, reply) => {
    const createSchema = z.object({
      width: z.number().positive(),
      height: z.number().positive(),
    })

    const data = createSchema.parse(request.body)
    const userId = request.user.sub

    const { mapId } = await createMap({ ...data, userId })

    return reply.status(201).send({ mapId })
  })

  app.put('/:mapId', async (request, reply) => {
    return reply.status(204).send()
  })

  app.delete('/:mapId', async (request, reply) => {
    return reply.status(204).send()
  })
}
