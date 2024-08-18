import { z } from 'zod'
import { createMap } from '../../use-cases/maps/create-map.js'
import { deleteMap } from '../../use-cases/maps/delete-map.js'
import { getMapById } from '../../use-cases/maps/get-map-by-id.js'
import { updateMap } from '../../use-cases/maps/update-map.js'
import {
  createMapSchema,
  deleteMapSchema,
  getMapByIdSchema,
  updateMapSchema,
} from './schema.js'

const mapIdParamSchema = z.object({
  mapId: z.coerce.number(),
})

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export default async function (app) {
  app.addHook('onRequest', app.authenticate)

  app.get('/:mapId', { schema: getMapByIdSchema }, async (request, reply) => {
    const { mapId } = mapIdParamSchema.parse(request.params)

    return getMapById(mapId)
  })

  app.post('/', { schema: createMapSchema }, async (request, reply) => {
    const createSchema = z.object({
      width: z.number().positive(),
      height: z.number().positive(),
    })

    const data = createSchema.parse(request.body)
    const userId = request.user.sub

    const { mapId } = await createMap({ ...data, userId })

    return reply.status(201).send({ mapId })
  })

  app.put('/:mapId', { schema: updateMapSchema }, async (request, reply) => {
    const { mapId } = mapIdParamSchema.parse(request.params)

    const mapChangesSchema = z.object({
      width: z.number().positive().optional(),
      height: z.number().positive().optional(),
    })

    const changes = mapChangesSchema.parse(request.body)

    const { updatedMap } = await updateMap(mapId, changes)

    return { updatedMap }
  })

  app.delete('/:mapId', { schema: deleteMapSchema }, async (request, reply) => {
    const { mapId } = mapIdParamSchema.parse(request.params)

    await deleteMap(mapId)

    return reply.status(204).send()
  })
}
