import { createMapControllers } from "../../http/controllers/map/create-map.js";
import { deleteMapController } from "../../http/controllers/map/delete-map.js";
import { findMapByIdController } from "../../http/controllers/map/find-map.js";
import { updateMapController } from "../../http/controllers/map/update-map.js";
/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export async function mapRoutes(app) {
  app.post("/", createMapControllers);
  app.get("/:id", findMapByIdController);
  app.put("/:id", updateMapController); // Update map route can be added here if needed.
  app.delete("/:id", deleteMapController);
}
