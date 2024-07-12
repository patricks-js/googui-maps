import { updateMap } from "../../../data/usecases/maps/update-map.js";

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */

export async function updateMapController(request, reply) {
  try {
    const updatedMap = await updateMap(request.params.id, request.body);
    return reply.status(200).send(updatedMap);
  } catch (error) {
    reply.status(404).send(error);
  }
}
