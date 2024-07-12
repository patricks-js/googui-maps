import { createMapControllers } from "../../http/controllers/map/create-map.js";

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export async function mapRoutes(app) {
  app.post("/", createMapControllers);
}
