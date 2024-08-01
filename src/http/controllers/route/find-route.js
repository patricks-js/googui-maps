import { z } from "zod";
import { Node } from "../../../data/models/node.js";
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
  routeSchema.parse(request.body);
  const inputJSON = request.body;
  const result = await findBestRouteFromJSON(inputJSON);
  Node.create(result);
  return reply.status(200).send({
    message: " Os pontos e o mapa são válidos e existem no banco de dados."
  });
}
