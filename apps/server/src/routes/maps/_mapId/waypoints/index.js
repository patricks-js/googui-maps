import { z } from 'zod'
import { createWaypoint } from '../../../../use-cases/waypoints/create-waypoint.js'
import { deleteWaypoint } from '../../../../use-cases/waypoints/delete-waypoint.js'
import { getAllWaypoints } from '../../../../use-cases/waypoints/get-all-waypoint.js'
import { updateWaypoint } from '../../../../use-cases/waypoints/update-waypoint.js'

const mapParamSchema = z.object({
  mapId: z.coerce.number(),
})

const mapWaypointParamSchema = z.object({
  waypointId: z.coerce.number(),
  mapId: z.coerce.number(),
})

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export default async function (app) {
  app.addHook('onRequest', app.authenticate)

  app.get('/', async (request, reply) => {
    const { mapId } = mapParamSchema.parse(request.params)

    const { waypoints } = await getAllWaypoints(mapId)

    return { waypoints }
  })

  app.post('/', async (request, reply) => {
    const { mapId } = mapParamSchema.parse(request.params)

    const createSchema = z.object({
      position: z.object({
        x: z.number(),
        y: z.number(),
      }),
      name: z.string(),
    })

    const data = createSchema.parse(request.body)

    const { newWaypoint } = await createWaypoint({ mapId, ...data })

    return { newWaypoint }
  })

  app.put('/:waypointId', async (request, reply) => {
    const { waypointId, mapId } = mapWaypointParamSchema.parse(request.params)

    const waypointChangesSchema = z.object({
      position: z
        .object({
          x: z.number().optional(),
          y: z.number().optional(),
        })
        .optional(),
      name: z.string().optional(),
    })

    const changes = waypointChangesSchema.parse(request.body)

    const { updatedWaypoint } = await updateWaypoint(waypointId, {
      ...changes,
      mapId,
    })

    return { updatedWaypoint }
  })

  app.delete('/:waypointId', async (request, reply) => {
    const { waypointId, mapId } = mapWaypointParamSchema.parse(request.params)

    await deleteWaypoint(waypointId, mapId)

    return reply.status(204).send()
  })
}
