import { z } from "zod";
import { deleteUser } from "../../../data/usecases/user/delete-user.js";

const paramsSchema = z.object({
  id: z.string()
});

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function deleteUserController(request, reply) {
  try {
    const { id } = paramsSchema.parse(request.params);
    await deleteUser(id);

    reply.status(204);
  } catch (error) {
    reply.status(400).send(error);
  }
}
