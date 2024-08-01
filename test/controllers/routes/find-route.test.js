import Fastify from "fastify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { findBestRouteFromJSON } from "../../../src/data/usecases/route/find-route.js";
import { findRouteController } from "../../../src/http/controllers/route/find-route.js";

vi.mock("../../../src/data/usecases/route/find-route.js");

describe("findRouteController", () => {
  let fastify;

  beforeEach(() => {
    fastify = Fastify();
    fastify.post("/route", findRouteController);
    vi.clearAllMocks();
  });

  it("should find the best route and return 200 status code", async () => {
    const mockRoute = {
      map_id: "map1",
      start_point: { x: 0, y: 0 },
      end_point: { x: 1, y: 1 }
    };

    const mockResult = {
      optimal_path: [
        { x: 0, y: 0 },
        { x: 1, y: 1 }
      ]
    };

    findBestRouteFromJSON.mockResolvedValue(mockResult);

    const response = await fastify.inject({
      method: "POST",
      url: "/route",
      payload: mockRoute
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(mockResult);
    expect(findBestRouteFromJSON).toHaveBeenCalledWith(mockRoute);
  });

  it("should return 400 status code if validation fails", async () => {
    const invalidRoute = {
      map_id: "map1",
      start_point: { x: 0, y: 0 }
      // end_point is missing
    };

    const response = await fastify.inject({
      method: "POST",
      url: "/route",
      payload: invalidRoute
    });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toHaveProperty("error");
    expect(findBestRouteFromJSON).not.toHaveBeenCalled();
  });

  it("should return 400 status code if findBestRouteFromJSON throws an error", async () => {
    const mockRoute = {
      map_id: "map1",
      start_point: { x: 0, y: 0 },
      end_point: { x: 1, y: 1 }
    };

    findBestRouteFromJSON.mockRejectedValue(new Error("Error finding route"));

    const response = await fastify.inject({
      method: "POST",
      url: "/route",
      payload: mockRoute
    });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({ error: "Error finding route" });
    expect(findBestRouteFromJSON).toHaveBeenCalledWith(mockRoute);
  });
});
