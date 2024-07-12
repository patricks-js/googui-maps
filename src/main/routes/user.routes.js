import { createUserController } from "../../http/controllers/user/create-user.js";

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export async function userRoutes(app) {
  app.post("/", createUserController);
}
