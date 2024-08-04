import { z } from "zod";
import { updateUser } from "../../../data/usecases/user/update-user.js";
import { validators } from "../../validators.js";

const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  _id: z.string()
});

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function updateUserController(request, reply) {
  const { id } = validators.idParamSchema(request.params);
  const changes = userSchema.parse(request.body);

  return updateUser(id, changes);
}
