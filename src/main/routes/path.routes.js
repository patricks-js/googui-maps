import { createPathController } from "../../http/controllers/path/create-path.js";
import { deletePathController } from "../../http/controllers/path/delete-path.js";
import { findPathController } from "../../http/controllers/path/find-path.js";
import { updatePathController } from "../../http/controllers/path/update-path.js";

import {
  deletePathSchema,
  pathGetSchema,
  pathPostSchema,
  pathPutSchema
} from "../config/path-schema.js";

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export async function pathRoutes(app) {
  app.post("/", pathPostSchema, createPathController);
  app.get("/:id", pathGetSchema, findPathController);
  app.put("/:id", pathPutSchema, updatePathController);
  app.delete("/:id", deletePathSchema, deletePathController);
}
