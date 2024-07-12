import { createMapControllers } from "../../http/controllers/map/create-map.js";
import { findMapByIdController } from "../../http/controllers/map/find-map.js";

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export async function mapRoutes(app) {
  app.post("/", createMapControllers);
  app.get("/:id", findMapByIdController);
}
