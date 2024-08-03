import { deleteMap } from "../../../data/usecases/map/delete-map.js";

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function deleteMapController(request, reply) {
  const { id } = validators.idParamSchema(request.params);
  await deleteMap(id);

  return reply.status(204).send();
}
