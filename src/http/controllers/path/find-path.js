import { z } from "zod";
import { findPath } from "../../../data/usecases/path/find-path.js";

const paramsSchema = z.object({
  id: z.string()
});

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function findPathController(request, reply) {
  const { id } = paramsSchema.parse(request.params);
  return findPath(id);
}
