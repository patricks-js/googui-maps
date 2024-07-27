import { z } from "zod";
import { deletePath } from "../../../data/usecases/path/delete-path.js";

const pathSchema = z.object({
  id: z.string().min(1, "ID is required")
});

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function deletePathController(request, reply) {
  try {
    pathSchema.parse(request.params);

    const path = await deletePath(request.params.id);

    if (!path) {
      return reply.status(404).send({ error: "Path not found" });
    }

    return reply.status(200).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ error: "Bad Request", message: error.errors });
    }
    return reply.status(404).send({ error: error.message || "Not Found" });
  }
}
