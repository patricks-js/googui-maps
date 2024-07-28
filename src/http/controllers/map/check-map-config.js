import { checkMapConfiguration } from "../../../data/usecases/map/check-map-config.js";

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function checkMapController(request, reply) {
  try {
    const { map_id: mapId } = request.body;
    console.log(mapId);

    const result = await checkMapConfiguration(mapId);

    return reply.status(200).send(result);
  } catch (error) {
    return reply.status(404).send({ error: error.message });
  }
}
