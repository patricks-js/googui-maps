import { z } from "zod";
import { verifyMap } from "../../../data/usecases/map/verify-map.js";

const mapSchema = z.object({
  map_id: z.string(),
  start_point: z.object({
    x: z.number(),
    y: z.number()
  }),
  destination_point: z.object({
    x: z.number(),
    y: z.number()
  })
});

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function verifyMapController(request, reply) {
  try {
    mapSchema.parse(request.body);

    const {
      map_id: mapId,
      start_point: startPoint,
      destination_point: destinationPoint
    } = request.body;

    await verifyMap(mapId, startPoint, destinationPoint);
    return reply.status(200).send({
      message: "Os pontos e o mapa são válidos e existem no banco de dados."
    });
  } catch (error) {
    reply.status(400).send(error.message);
  }
}
