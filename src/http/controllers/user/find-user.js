import { z } from "zod";
import { findUser } from "../../../data/usecases/user/find-user.js";

const paramsSchema = z.object({
  id: z.string()
});

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function findUserController(request, reply) {
  const { id } = paramsSchema.parse(request.params);
  return findUser(id);
}
