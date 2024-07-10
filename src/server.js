import fastifyCors from "@fastify/cors";
import fastify from "fastify";

const app = fastify({
  logger: true
});

app.register(fastifyCors, {
  origin: "*"
});

app.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

try {
  await app.listen({ port: 3333 });
  const address = app.server.address();
  const port = typeof address === "string" ? address : address?.port;
  console.info(`Application listen on: ${port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
