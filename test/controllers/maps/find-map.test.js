import { beforeEach, describe, expect, it, vi } from "vitest";
import { findMapById } from "../../../src/data/usecases/map/find-map.js";
import { findMapByIdController } from "../../../src/http/controllers/map/find-map.js";
import { validators } from "../../../src/http/validators.js";

vi.mock("../../../src/data/usecases/map/find-map.js", () => ({
  findMapById: vi.fn()
}));

vi.mock("../../../src/http/validators.js", () => ({
  validators: {
    idParamSchema: vi.fn()
  }
}));

describe("findMapByIdController", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = {
      params: { id: "123" }
    };

    reply = {
      send: vi.fn(),
      status: vi.fn(() => reply)
    };

    validators.idParamSchema.mockReturnValue({ id: "123" });
    findMapById.mockResolvedValue({
      id: "123",
      name: "Test Map",
      dimensions: { width: 100, height: 200 },
      obstacles: [{ x: 10, y: 20 }]
    });
  });

  it("should find the map by id successfully", async () => {
    await findMapByIdController(request, reply);
    expect(validators.idParamSchema).toHaveBeenCalledWith(request.params);
    expect(findMapById).toHaveBeenCalledWith("123");
  });

  it("should handle errors from findMapById", async () => {
    findMapById.mockRejectedValue(new Error("Find Error"));

    try {
      await findMapByIdController(request, reply);
    } catch (e) {
      expect(e.message).toBe("Find Error");
    }
  });

  it("should handle invalid id", async () => {
    validators.idParamSchema.mockImplementation(() => {
      throw new Error("Invalid ID");
    });

    try {
      await findMapByIdController(request, reply);
    } catch (e) {
      expect(e.message).toBe("Invalid ID");
    }
  });
});
