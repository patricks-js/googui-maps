import { findMapById } from "../../../data/usecases/maps/find-map.js";

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */

export async function findMapByIdController(request, reply) {
  try {
    const map = await findMapById(request.params.id);
    return reply.status(200).send(map);
  } catch (error) {
    reply.status(404).send(error);
  }
}
