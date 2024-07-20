import { z } from "zod";
import { findBestRouteFromJSON } from "../../../data/usecases/route/find-route.js";

const routeSchema = z.object({
  map_id: z.string(),
  start_point: z.object({
    x: z.number(),
    y: z.number()
  }),

  end_point: z.object({
    x: z.number(),
    y: z.number()
  })
});

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function findRouteController(request, reply) {
  try {
    routeSchema.parse(request.body);
    const inputJSON = request.body;
    const result = await findBestRouteFromJSON(inputJSON);

    return reply.status(200).send(result);
  } catch (error) {
    return reply.status(400).send({ error: error.message });
  }
}
