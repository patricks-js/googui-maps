import { findRouteController } from "../../http/controllers/route/find-route.js";
import { findRouteSchema } from "../config/route-schema.js";

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export async function routeRoutes(app) {
  app.post("/", findRouteSchema, findRouteController);
}
