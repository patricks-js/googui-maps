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
  try {
    const { id } = paramsSchema.parse(request.params);
    const user = await findUser(id);

    reply.status(204).send(user);
  } catch (error) {
    reply.status(400).send(error);
  }
}
