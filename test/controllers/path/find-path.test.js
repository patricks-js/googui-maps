import Fastify from "fastify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { findPath } from "../../../src/data/usecases/path/find-path.js";
import { findPathController } from "../../../src/http/controllers/path/find-path.js";

vi.mock("../../../src/data/usecases/path/find-path.js");

describe("findPathController", () => {
  let fastify;

  beforeEach(() => {
    fastify = Fastify();
    fastify.get("/path/:id", findPathController);
    vi.clearAllMocks();
  });

  it("should return 200 status code if path is found", async () => {
    const mockPath = { _id: "123", name: "Test Path" };
    findPath.mockResolvedValue(mockPath);

    const response = await fastify.inject({
      method: "GET",
      url: "/path/123"
    });

    expect(response.statusCode).toBe(200);
    expect(findPath).toHaveBeenCalledWith("123");
    expect(response.json()).toEqual(mockPath);
  });

  it("should return 400 status code if validation fails", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/path/"
    });

    expect(response.statusCode).toBe(400);
    const body = response.json();
    expect(body).toHaveProperty("error", "Bad Request");
    expect(body).toHaveProperty("message");
  });

  it("should return 404 status code if path is not found", async () => {
    findPath.mockResolvedValue(null);

    const response = await fastify.inject({
      method: "GET",
      url: "/path/123"
    });

    expect(response.statusCode).toBe(404);
    const body = response.json();
    expect(body).toHaveProperty("error", "Path not found");
  });

  it("should return 404 status code if findPath throws an error", async () => {
    findPath.mockRejectedValue(new Error("Error finding path"));

    const response = await fastify.inject({
      method: "GET",
      url: "/path/123"
    });

    expect(response.statusCode).toBe(404);
    const body = response.json();
    expect(body).toHaveProperty("error", "Error finding path");
  });
});
