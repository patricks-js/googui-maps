import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { createMap } from "../../../src/data/usecases/map/create-map.js";
import { createMapControllers } from "../../../src/http/controllers/map/create-map.js";

vi.mock("../../../src/data/usecases/map/create-map.js", () => ({
  createMap: vi.fn()
}));

describe("createMapControllers", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockRequest = (body) => ({
    body
  });

  const mockReply = () => {
    const reply = {};
    reply.status = vi.fn().mockReturnValue(reply);
    reply.send = vi.fn().mockReturnValue(reply);
    return reply;
  };

  it("should return 201 when a new map is successfully created", async () => {
    const validMap = {
      name: "New Map",
      dimensions: {
        width: 100,
        height: 100
      },
      obstacles: [
        { x: 10, y: 10 },
        { x: 20, y: 20 }
      ]
    };

    const createdMap = {
      id: "5678",
      ...validMap
    };

    createMap.mockResolvedValue(createdMap);

    const request = mockRequest(validMap);
    const reply = mockReply();

    await createMapControllers(request, reply);

    expect(createMap).toHaveBeenCalledWith(validMap);
    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith(createdMap);
  });

  it("should return 400 with validation error if the input data is invalid", async () => {
    const invalidMap = {
      name: "New Map",
      dimensions: {
        width: "not-a-number", // Invalid type
        height: 100
      },
      obstacles: [
        { x: 10, y: 10 },
        { x: 20, y: 20 }
      ]
    };

    const request = mockRequest(invalidMap);
    const reply = mockReply();

    await createMapControllers(request, reply);

    expect(createMap).not.toHaveBeenCalled();
    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith(expect.any(z.ZodError));
  });

  it("should return 400 with an error message if the map creation fails", async () => {
    const validMap = {
      name: "New Map",
      dimensions: {
        width: 100,
        height: 100
      },
      obstacles: [
        { x: 10, y: 10 },
        { x: 20, y: 20 }
      ]
    };

    const error = new Error("Error creating map");
    createMap.mockRejectedValue(error);

    const request = mockRequest(validMap);
    const reply = mockReply();

    await createMapControllers(request, reply);

    expect(createMap).toHaveBeenCalledWith(validMap);
    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith(error);
  });
});
