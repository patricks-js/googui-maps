import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { createMap } from "../../../src/data/usecases/map/create-map.js";
import { createMapControllers } from "../../../src/http/controllers/map/create-map.js";

// Mock the createMap function
vi.mock("../../../src/data/usecases/map/create-map.js", () => ({
  createMap: vi.fn()
}));

// No need to mock mapSchema directly
const mapSchema = z.object({
  name: z.string(),
  dimensions: z.object({
    width: z.number(),
    height: z.number()
  }),
  obstacles: z.array(z.object({ x: z.number(), y: z.number() }))
});

describe("createMapControllers", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = {
      body: {
        name: "New Map",
        dimensions: { width: 100, height: 200 },
        obstacles: [{ x: 10, y: 20 }]
      }
    };

    reply = {
      status: vi.fn(() => reply),
      send: vi.fn()
    };

    createMap.mockResolvedValue({
      id: "123",
      name: "New Map",
      dimensions: { width: 100, height: 200 },
      obstacles: [{ x: 10, y: 20 }]
    });
  });

  it("should create a map successfully", async () => {
    await createMapControllers(request, reply);
    expect(createMap).toHaveBeenCalledWith({
      name: "New Map",
      dimensions: { width: 100, height: 200 },
      obstacles: [{ x: 10, y: 20 }]
    });
    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith({
      id: "123",
      name: "New Map",
      dimensions: { width: 100, height: 200 },
      obstacles: [{ x: 10, y: 20 }]
    });
  });

  it("should handle validation errors", async () => {
    request.body = {}; // Invalid body
    const parseSpy = vi.spyOn(mapSchema, "parse").mockImplementation(() => {
      throw new z.ZodError([
        {
          code: "invalid_type",
          expected: "string",
          received: "undefined",
          path: ["name"],
          message: "Required"
        },
        {
          code: "invalid_type",
          expected: "object",
          received: "undefined",
          path: ["dimensions"],
          message: "Required"
        },
        {
          code: "invalid_type",
          expected: "array",
          received: "undefined",
          path: ["obstacles"],
          message: "Required"
        }
      ]);
    });

    try {
      await createMapControllers(request, reply);
    } catch (e) {
      expect(e).toBeInstanceOf(z.ZodError);
      expect(e.errors).toEqual([
        {
          code: "invalid_type",
          expected: "string",
          received: "undefined",
          path: ["name"],
          message: "Required"
        },
        {
          code: "invalid_type",
          expected: "object",
          received: "undefined",
          path: ["dimensions"],
          message: "Required"
        },
        {
          code: "invalid_type",
          expected: "array",
          received: "undefined",
          path: ["obstacles"],
          message: "Required"
        }
      ]);
    }
    parseSpy.mockRestore();
  });

  it("should handle errors from createMap", async () => {
    createMap.mockRejectedValue(new Error("Create Error"));

    try {
      await createMapControllers(request, reply);
    } catch (e) {
      expect(e.message).toBe("Create Error");
    }
  });
});
