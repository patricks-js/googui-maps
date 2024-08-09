import { validators } from "../../validators.js";

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export function verifyMapIdController(request, reply) {
  validators.idParamSchema(request.body);
  return { message: "O formato do ID do mapa é válido." };
}
