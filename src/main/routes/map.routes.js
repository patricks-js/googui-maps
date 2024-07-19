import { checkMapController } from "../../http/controllers/map/check-map-config.js";
import { createMapControllers } from "../../http/controllers/map/create-map.js";
import { deleteMapController } from "../../http/controllers/map/delete-map.js";
import { findMapByIdController } from "../../http/controllers/map/find-map.js";
import { updateMapController } from "../../http/controllers/map/update-map.js";
import { verifyMapController } from "../../http/controllers/map/verify-map.js";
import {
  checkMapConfiguration,
  deleteMapSchema,
  mapGetSchema,
  mapPostSchema,
  mapPutSchema,
  mapVerifySchema
} from "../config/map-schema.js";
/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export async function mapRoutes(app) {
  app.post("/", mapPostSchema, createMapControllers);
  app.get("/:id", mapGetSchema, findMapByIdController);
  app.put("/:id", mapPutSchema, updateMapController); // Update map route can be added here if needed.
  app.delete("/:id", deleteMapSchema, deleteMapController);
  app.post("/check", checkMapConfiguration, checkMapController);
  app.post("/verify", mapVerifySchema, verifyMapController);
}
