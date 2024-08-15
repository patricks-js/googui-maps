import { findPath } from '../../../data/usecases/path/find-path.js'
import { validators } from '../../validators.js'

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function findPathController(request, reply) {
  const { id } = validators.idParamSchema(request.params)

  return findPath(id)
}
