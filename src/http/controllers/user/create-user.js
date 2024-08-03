import { createUser } from "../../../data/usecases/user/create-user.js";
import { validators } from "../../validators.js";

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function createUserController(request, reply) {
  const body = validators.createUserSchema(request.body);
  const createdUser = await createUser(body);

  return reply.status(201).send(createdUser);
}
