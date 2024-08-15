import { z } from 'zod'
import { verifyMap } from '../../../data/usecases/map/verify-map.js'

const mapSchema = z.object({
  map_id: z.string(),
  start_point: z.object({
    x: z.number(),
    y: z.number(),
  }),
  destination_point: z.object({
    x: z.number(),
    y: z.number(),
  }),
})

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function verifyMapController(request, reply) {
  mapSchema.parse(request.body)

  const {
    map_id: mapId,
    start_point: startPoint,
    destination_point: destinationPoint,
  } = request.body

  return verifyMap(mapId, startPoint, destinationPoint)
}
