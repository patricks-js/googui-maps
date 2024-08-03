import { findWaypoint } from "../../../data/usecases/waypoint/find-waypoint.js";
import { validators } from "../../validators.js";

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */

export async function findWaypointController(request, reply) {
  const { id } = validators.idParamSchema(request.params);

  return findWaypoint(id);
}
