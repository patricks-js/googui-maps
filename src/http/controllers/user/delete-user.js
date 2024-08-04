import { deleteUser } from "../../../data/usecases/user/delete-user.js";
import { validators } from "../../validators.js";

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function deleteUserController(request, reply) {
  const { id } = validators.idParamSchema(request.params);

  return deleteUser(id);
}
