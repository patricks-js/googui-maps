import { beforeEach, describe, expect, it, vi } from "vitest";
import { findPath } from "../../../src/data/usecases/path/find-path.js";
import { findPathController } from "../../../src/http/controllers/path/find-path.js";
import { validators } from "../../../src/http/validators.js";

vi.mock("../../../src/data/usecases/path/find-path.js", () => ({
  findPath: vi.fn()
}));

vi.mock("../../../src/http/validators.js", () => ({
  validators: {
    idParamSchema: vi.fn()
  }
}));

describe("findPathController", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = {
      params: { id: "path123" }
    };

    reply = {
      send: vi.fn(),
      status: vi.fn(() => reply) // Ensure chainability for `status`
    };

    // Mock successful response
    findPath.mockResolvedValue({ id: "path123", name: "Test Path" });

    // Mock idParamSchema method
    validators.idParamSchema.mockImplementation((params) => params);
  });

  it("should find the path successfully", async () => {
    await findPathController(request, reply);

    expect(validators.idParamSchema).toHaveBeenCalledWith(request.params);

    expect(findPath).toHaveBeenCalledWith("path123");
  });

  it("should handle validation errors", async () => {
    validators.idParamSchema.mockImplementation(() => {
      throw new Error("Validation Error");
    });

    try {
      await findPathController(request, reply);
    } catch (e) {
      expect(e.message).toBe("Validation Error");
    }
  });

  it("should handle errors from findPath", async () => {
    findPath.mockRejectedValue(new Error("Find Path Error"));

    try {
      await findPathController(request, reply);
    } catch (e) {
      expect(e.message).toBe("Find Path Error");
    }
  });
});
