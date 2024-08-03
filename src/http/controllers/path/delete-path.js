import { deletePath } from "../../../data/usecases/path/delete-path.js";
import { validators } from "../../validators.js";

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function deletePathController(request, reply) {
  const { id } = validators.idParamSchema(request.params);
  await deletePath(id);

  return reply.status(204).send();
}
