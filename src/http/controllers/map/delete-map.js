import { z } from "zod";
import { deleteMap } from "../../../data/usecases/maps/delete-map.js";

const mapSchema = z.object({
  id: z.string()
});
/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export function deleteMapController(request, reply) {
  try {
    mapSchema.parse(request.params);

    deleteMap(request.params.id);
    return reply.status(204).send();
  } catch (error) {
    reply.status(404).send(error);
  }
}
