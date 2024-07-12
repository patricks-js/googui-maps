import { createObstacleController } from "../../http/controllers/obstacle/create-obstacle.js";
import { findObstacleController } from "../../http/controllers/obstacle/find-obstacle.js";
import {
  obstacleGetSchema,
  obstaclePostSchema
} from "../config/obstacle-schema.js";
/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export async function obstacleRoutes(app) {
  app.post("/", obstaclePostSchema, createObstacleController);
  app.get("/:id", obstacleGetSchema, findObstacleController);
}
