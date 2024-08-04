import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { updateMap } from "../../../src/data/usecases/map/update-map.js";
import { updateMapController } from "../../../src/http/controllers/map/update-map.js";
import { validators } from "../../../src/http/validators.js";

vi.mock("../../../src/data/usecases/map/update-map.js", () => ({
  updateMap: vi.fn()
}));

vi.mock("../../../src/http/validators.js", () => ({
  validators: {
    idParamSchema: vi.fn()
  }
}));

const mapSchema = z.object({
  name: z.string(),
  dimensions: z.object({
    width: z.number(),
    height: z.number()
  }),
  obstacles: z.array(z.object({ x: z.number(), y: z.number() }))
});

describe("updateMapController", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = {
      params: { id: "123" },
      body: {
        name: "New Map",
        dimensions: { width: 100, height: 200 },
        obstacles: [{ x: 10, y: 20 }]
      }
    };

    reply = {
      send: vi.fn()
    };

    validators.idParamSchema.mockImplementation((params) => ({
      id: params.id
    }));
    updateMap.mockResolvedValue({ success: true });
  });

  it("should update the map successfully", async () => {
    await updateMapController(request, reply);
    expect(validators.idParamSchema).toHaveBeenCalledWith(request.params);
    expect(updateMap).toHaveBeenCalledWith("123", {
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
      await updateMapController(request, reply);
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

  it("should handle errors from updateMap", async () => {
    updateMap.mockRejectedValue(new Error("Update Error"));

    try {
      await updateMapController(request, reply);
    } catch (e) {
      expect(e.message).toBe("Update Error");
    }
  });
});
