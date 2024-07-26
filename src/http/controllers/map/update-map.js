import { z } from "zod";
import { updateMap } from "../../../data/usecases/map/update-map.js";

const idMapSchema = z.object({ id: z.string() });

const mapSchema = z.object({
  name: z.string(),
  dimensions: z.object({
    width: z.number(),
    height: z.number()
  }),
  obstacles: z.array(z.object({ x: z.number(), y: z.number() }))
});

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function updateMapController(request, reply) {
  try {
    idMapSchema.parse(request.params);
    mapSchema.parse(request.body);

    const updatedMap = await updateMap(request.params.id, request.body);
    return reply.status(200).send(updatedMap);
  } catch (error) {
    reply.status(404).send(error);
  }
}
