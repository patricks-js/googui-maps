import fastifyCors from "@fastify/cors";

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export async function cors(app) {
  app.register(fastifyCors, {
    origin: "*"
  });
}
