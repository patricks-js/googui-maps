import { z } from "zod";
import { createUser } from "../../../data/usecases/user/create-user.js";

const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  _id: z.string()
});

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function createUserController(request, reply) {
  const body = userSchema.parse(request.body);

  return createUser(body);
}
