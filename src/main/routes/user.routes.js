import { createUserController } from "../../http/controllers/user/create-user.js";
import { deleteUserController } from "../../http/controllers/user/delete-user.js";

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export async function userRoutes(app) {
  app.post("/", createUserController);
  app.delete("/:id", deleteUserController);
}
