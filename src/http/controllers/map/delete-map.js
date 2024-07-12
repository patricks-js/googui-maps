import { deleteMap } from "../../../data/usecases/maps/delete-map.js";

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */

export async function deleteMapController(request, reply) {
  try {
    await deleteMap(request.params.id);
    return reply.status(204);
  } catch (error) {
    reply.status(404).send(error);
  }
}
