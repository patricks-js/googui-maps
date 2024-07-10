import fastify from "fastify";

const app = fastify({
  logger: true
});

app.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

try {
  await app.listen({ port: 3333 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
