import { findObstacle } from "../../../data/usecases/obstacle/find-obstacle.js";
import { validators } from "../../validators.js";

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} response
 */
export async function findObstacleController(request, response) {
  const { id } = validators.idParamSchema(request.params);

  return findObstacle(id);
}
