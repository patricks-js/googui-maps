import { createUserController } from "../../http/controllers/user/create-user.js";
import { deleteUserController } from "../../http/controllers/user/delete-user.js";
import { findUserController } from "../../http/controllers/user/find-user.js";
import { updateUserController } from "../../http/controllers/user/update-user.js";
import {
  userDeleteSchema,
  userGetSchema,
  userPostSchema,
  userPutSchema
} from "../config/schemas/user-schema.js";

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export async function userRoutes(app) {
  app.post("/", userPostSchema, createUserController);
  app.get("/:id", userGetSchema, findUserController);
  app.put("/:id", userPutSchema, updateUserController);
  app.delete("/:id", userDeleteSchema, deleteUserController);
}
