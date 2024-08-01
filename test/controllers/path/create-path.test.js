import Fastify from "fastify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPath } from "../../../src/data/usecases/path/create-path.js";
import { createPathController } from "../../../src/http/controllers/path/create-path.js";

vi.mock("../../../src/data/usecases/path/create-path.js");

describe("createPathController", () => {
  let fastify;

  beforeEach(() => {
    fastify = Fastify();
    fastify.post("/path", createPathController);
    vi.clearAllMocks();
  });

  it("should create a path and return 201 status code", async () => {
    const mockPath = {
      mapId: "123",
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      distance: 100
    };

    createPath.mockResolvedValue(mockPath);

    const response = await fastify.inject({
      method: "POST",
      url: "/path",
      payload: mockPath
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body)).toEqual(mockPath);
    expect(createPath).toHaveBeenCalledWith(mockPath);
  });

  it("should return 400 status code if validation fails", async () => {
    const invalidPath = {
      mapId: "123",
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 }
    };

    const response = await fastify.inject({
      method: "POST",
      url: "/path",
      payload: invalidPath
    });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toHaveProperty("error");
    expect(createPath).not.toHaveBeenCalled();
  });

  it("should return 400 status code if createPath throws an error", async () => {
    const mockPath = {
      mapId: "123",
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      distance: 100
    };

    createPath.mockRejectedValue(new Error("Error creating path"));

    const response = await fastify.inject({
      method: "POST",
      url: "/path",
      payload: mockPath
    });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({ error: "Error creating path" });
    expect(createPath).toHaveBeenCalledWith(mockPath);
  });
});
