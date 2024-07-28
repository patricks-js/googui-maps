import { z } from "zod";
import { updateUser } from "../../../data/usecases/user/update-user.js";

const paramsSchema = z.object({
  id: z.string()
});

const bodySchema = z.object({
  username: z.string(),
  email: z.string().email()
});

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function updateUserController(request, reply) {
  const { id } = paramsSchema.parse(request.params);
  const changes = bodySchema.parse(request.body);
  const user = await updateUser(id, changes);

  reply.status(204).send(user);
}
