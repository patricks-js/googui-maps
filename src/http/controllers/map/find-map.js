import { findMapById } from "../../../data/usecases/map/find-map.js";

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function findMapByIdController(request, reply) {
  const { id } = validators.idParamSchema(request.params);
  return findMapById(id);
}
