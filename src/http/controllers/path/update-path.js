import { z } from "zod";
import { updatePath } from "../../../data/usecases/path/update-path.js";

const idPathSchema = z.object({ id: z.string().nonempty() });

const pathSchema = z.object({
  mapId: z.string().nonempty(),
  start: z.object({
    x: z.number(),
    y: z.number()
  }),
  end: z.object({
    x: z.number(),
    y: z.number()
  }),
  distance: z.number().positive()
});

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function updatePathController(request, reply) {
  try {
    idPathSchema.parse(request.params);
    pathSchema.parse(request.body);

    const updatedPath = await updatePath(request.params.id, request.body);
    return reply.status(200).send(updatedPath);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ error: "Bad Request", details: error.errors });
    }
    return reply.status(404).send({ error: "Not Found" });
  }
}
