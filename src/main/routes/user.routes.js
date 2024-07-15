import { createUserController } from "../../http/controllers/user/create-user.js";
import { deleteUserController } from "../../http/controllers/user/delete-user.js";
import { findUserController } from "../../http/controllers/user/find-user.js";

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export async function userRoutes(app) {
  app.post("/", createUserController);
  app.get("/:id", findUserController);
  app.delete("/:id", deleteUserController);
}
