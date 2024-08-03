import { findUser } from "../../../data/usecases/user/find-user.js";
import { validators } from "../../validators.js";

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function findUserController(request, reply) {
  const { id } = validators.idParamSchema(request.params);

  return findUser(id);
}
