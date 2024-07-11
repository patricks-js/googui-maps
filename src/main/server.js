import Fastify from "fastify";
import { env } from "./config/env.js";
import { cors } from "./middlewares/cors.js";
import { mongodb } from "./plugins/mongodb.js";
import { openapi } from "./plugins/openapi.js";
import { scalarUi } from "./plugins/scalar.js";

const app = Fastify({
  logger: true
});

// * Middlewares
app.register(cors);

// * Plugins
app.register(mongodb);
app.register(openapi);
app.register(scalarUi);

// * Routes
app.get("/", async (request, reply) => ({ hello: "world" }));

// * Server
const port = env.PORT || 3333;
const host = "0.0.0.0";

try {
  await app.listen({ port, host });
  console.info(`HTTP server listen on: ${port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
