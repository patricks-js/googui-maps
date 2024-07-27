import Fastify from "fastify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { updatePath } from "../../../src/data/usecases/path/update-path.js";
import { updatePathController } from "../../../src/http/controllers/path/update-path.js";

vi.mock("../../../src/data/usecases/path/update-path.js");

describe("updatePathController", () => {
  let fastify;

  beforeEach(() => {
    fastify = Fastify();
    fastify.put("/path/:id", updatePathController);
    vi.clearAllMocks();
  });

  it("should update a path and return 200 status code", async () => {
    const mockPathId = "123";
    const mockPathData = {
      mapId: "map123",
      start: { x: 1, y: 1 },
      end: { x: 2, y: 2 },
      distance: 10
    };
    const updatedPath = { ...mockPathData, id: mockPathId };
    updatePath.mockResolvedValue(updatedPath);

    const response = await fastify.inject({
      method: "PUT",
      url: `/path/${mockPathId}`,
      payload: mockPathData
    });

    expect(response.statusCode).toBe(200);
    expect(updatePath).toHaveBeenCalledWith(mockPathId, mockPathData);
    expect(response.json()).toEqual(updatedPath);
  });

  it("should return 400 status code if path ID validation fails", async () => {
    const invalidId = "";
    const response = await fastify.inject({
      method: "PUT",
      url: `/path/${invalidId}`,
      payload: {
        mapId: "map123",
        start: { x: 1, y: 1 },
        end: { x: 2, y: 2 },
        distance: 10
      }
    });

    expect(response.statusCode).toBe(400);
    const body = response.json();
    expect(body).toHaveProperty("error", "Bad Request");
  });

  it("should return 400 status code if request body validation fails", async () => {
    const mockPathId = "123";
    const invalidData = {
      mapId: "map123",
      start: { x: 1, y: 1 },
      end: { x: 2, y: "invalid" },
      distance: 10
    };

    const response = await fastify.inject({
      method: "PUT",
      url: `/path/${mockPathId}`,
      payload: invalidData
    });

    expect(response.statusCode).toBe(400);
    const body = response.json();
    expect(body).toHaveProperty("error", "Bad Request");
  });

  it("should return 404 status code if updatePath throws an error", async () => {
    const mockPathId = "123";
    const mockPathData = {
      mapId: "map123",
      start: { x: 1, y: 1 },
      end: { x: 2, y: 2 },
      distance: 10
    };
    updatePath.mockRejectedValue(new Error("Path not found"));

    const response = await fastify.inject({
      method: "PUT",
      url: `/path/${mockPathId}`,
      payload: mockPathData
    });

    expect(response.statusCode).toBe(404);
    const body = response.json();
    expect(body).toHaveProperty("error", "Not Found");
  });
});
