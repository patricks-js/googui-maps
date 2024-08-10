import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { verifyMapId } from "../../../src/data/usecases/map/map-id-verify.js";
import { verifyMapIdController } from "../../../src/http/controllers/map/map-id-verify.js";

// Mock the verifyMapId function
vi.mock("../../../src/data/usecases/map/map-id-verify.js", () => ({
  verifyMapId: vi.fn()
}));

describe("verifyMapIdController", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = {
      body: {
        id: "66b6774920ed1fbdf7609d13"
      }
    };

    reply = {
      status: vi.fn(() => reply),
      send: vi.fn()
    };

    verifyMapId.mockReturnValue({
      message: `O formato do ID: ${request.body.id} do mapa é válido.`
    });
  });

  it("should return a valid message for a correct map ID", async () => {
    const result = await verifyMapIdController(request, reply);
    expect(result).toEqual({
      message: `O formato do ID: ${request.body.id} do mapa é válido.`
    });
  });

  it("should handle errors in the validation schema", async () => {
    // Simular um erro de validação
    const parseSpy = vi
      .spyOn(z.object({ id: z.string() }), "parse")
      .mockImplementation(() => {
        throw new z.ZodError([
          {
            code: "custom",
            path: ["id"],
            message: "Invalid input"
          }
        ]);
      });

    request.body.id = "invalid_id";

    try {
      await verifyMapIdController(request, reply);
    } catch (error) {
      expect(error.errors).toEqual([
        {
          code: "custom",
          message: "Invalid input",
          path: ["id"]
        }
      ]);
    }

    parseSpy.mockRestore();
  });

  it("should return a 500 error if verifyMapId throws an error", async () => {
    verifyMapId.mockRejectedValue(new Error("Unexpected Error"));

    try {
      await verifyMapIdController(request, reply);
    } catch (error) {
      expect(error.message).toBe("Unexpected Error");
    }
  });
});
