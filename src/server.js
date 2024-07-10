import fastify from "fastify";
import { cors } from "./middlewares/cors.js";
import { openAPISpec } from "./middlewares/openapi.js";

const app = fastify({
  logger: true
});

app.register(cors);
app.register(openAPISpec);

app.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

try {
  await app.listen({ port: 3333, host: "0.0.0.0" });
  const address = app.server.address();
  const port = typeof address === "string" ? address : address?.port;
  console.info(`Application listen on: ${port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
