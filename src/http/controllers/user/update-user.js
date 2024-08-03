import { updateUser } from "../../../data/usecases/user/update-user.js";
import { validators } from "../../validators.js";

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function updateUserController(request, reply) {
  const { id } = validators.idParamSchema(request.params);
  const changes = validators.updateUserSchema(request.body);
  const user = await updateUser(id, changes);

  reply.status(204).send(user);
}
