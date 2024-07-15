import { z } from "zod";
import { createUser } from "../../../data/usecases/user/create-user.js";

const userSchema = z.object({
  username: z.string(),
  email: z.string().email()
});

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function createUserController(request, reply) {
  try {
    const data = userSchema.parse(request.body);
    const createdUser = await createUser(data);

    return reply.status(201).send(createdUser);
  } catch (error) {
    reply.status(400).send(error);
  }
}
