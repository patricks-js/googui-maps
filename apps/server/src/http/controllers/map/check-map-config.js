import { checkMapConfiguration } from '../../../data/usecases/map/check-map-config.js'

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function checkMapController(request, reply) {
  const { map_id: mapId } = request.body

  return checkMapConfiguration(mapId)
}
