import { describe, expect, it, vi } from "vitest";
import { checkMapConfiguration } from "../../../src/data/usecases/map/check-map-config.js";
import { checkMapController } from "../../../src/http/controllers/map/check-map-config.js";

vi.mock("../../../src/data/usecases/map/check-map-config.js", () => ({
  checkMapConfiguration: vi.fn()
}));

describe("checkMapController", () => {
  const mockRequest = (body) => ({
    body
  });

  const mockReply = () => {
    const reply = {};
    reply.status = vi.fn().mockReturnValue(reply);
    reply.send = vi.fn().mockReturnValue(reply);
    return reply;
  };

  it("should return 200 with a success message if map is correctly configured", async () => {
    const mapId = "1234";
    const result = {
      message: "The map is set up correctly with obstacles and stopping points."
    };

    checkMapConfiguration.mockResolvedValue(result);

    const request = mockRequest({ map_id: mapId });
    const reply = mockReply();

    await checkMapController(request, reply);

    expect(checkMapConfiguration).toHaveBeenCalledWith(mapId);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(result);
  });

  it("should return 404 with an error message if map is not correctly configured", async () => {
    const mapId = "1234";
    const errorMessage = "Map is not configured with obstacles or waypoints";

    checkMapConfiguration.mockRejectedValue(new Error(errorMessage));

    const request = mockRequest({ map_id: mapId });
    const reply = mockReply();

    await checkMapController(request, reply);

    expect(checkMapConfiguration).toHaveBeenCalledWith(mapId);
    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith({ error: errorMessage });
  });

  it("should return 404 with an error message if map is not found", async () => {
    const mapId = "1234";
    const errorMessage = "Map not found";

    checkMapConfiguration.mockRejectedValue(new Error(errorMessage));

    const request = mockRequest({ map_id: mapId });
    const reply = mockReply();

    await checkMapController(request, reply);

    expect(checkMapConfiguration).toHaveBeenCalledWith(mapId);
    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith({ error: errorMessage });
  });
});
