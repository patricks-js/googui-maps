import { deleteWaypoint } from '../../../data/usecases/waypoint/delete-waypoint.js'
import { validators } from '../../validators.js'

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */

export async function deleteWaypointController(request, reply) {
  const { id } = validators.idParamSchema(request.params)
  await deleteWaypoint(id)

  return reply.status(204).send()
}
