import { createMap } from "../../../data/usecases/map/create-map.js";

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function createMapControllers(request, reply) {
  try {
    const newMap = await createMap(request.body);
    return reply.status(201).send(newMap);
  } catch (error) {
    reply.status(400).send(error);
  }
}
