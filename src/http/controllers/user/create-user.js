import { z } from "zod";
import { User } from "../../../data/models/user.js";

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

    // const user = await User.findOne({ username });

    // if (user) {
    //   return user;
    // }

    const newUser = await User.create(data);
    return reply.status(201).send(newUser);
  } catch (error) {
    reply.status(500).send(error);
  }
}
