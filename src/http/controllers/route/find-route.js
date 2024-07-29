import { z } from "zod";
import { findBestRouteFromJSON } from "../../../data/usecases/route/find-route.js";

const routeSchema = z.object({
  map_id: z.string(),
  start_point: z.object({
    x: z.number(),
    y: z.number()
  }),
  stop_points: z.array(
    z.object({
      x: z.number(),
      y: z.number()
    })
  ),
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
  const body = routeSchema.parse(request.body);
  return findBestRouteFromJSON(body);
}
