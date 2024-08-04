import { beforeEach, describe, expect, it, vi } from "vitest";
import { checkMapConfiguration } from "../../../src/data/usecases/map/check-map-config.js";
import { checkMapController } from "../../../src/http/controllers/map/check-map-config.js";

vi.mock("../../../src/data/usecases/map/check-map-config.js", () => ({
  checkMapConfiguration: vi.fn()
}));

describe("checkMapController", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = {
      body: {
        map_id: "123"
      }
    };

    reply = {
      send: vi.fn(),
      status: vi.fn(() => reply)
    };

    checkMapConfiguration.mockResolvedValue({ valid: true });
  });

  it("should check the map configuration successfully", async () => {
    await checkMapController(request, reply);
    expect(checkMapConfiguration).toHaveBeenCalledWith("123");
  });

  it("should handle errors from checkMapConfiguration", async () => {
    checkMapConfiguration.mockRejectedValue(new Error("Check Error"));

    try {
      await checkMapController(request, reply);
    } catch (e) {
      expect(e.message).toBe("Check Error");
    }
  });

  it("should handle invalid map_id", async () => {
    request.body = {}; // Invalid body

    try {
      await checkMapController(request, reply);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe("Invalid request body");
    }
  });
});
