import { verifyMapId } from "../../../data/usecases/map/map-id-verify.js";
import { validators } from "../../validators.js";

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export function verifyMapIdController(request, reply) {
  const { id } = validators.idParamSchema(request.body);
  return verifyMapId(id);
}
