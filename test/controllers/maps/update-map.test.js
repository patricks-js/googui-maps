import { describe, expect, it, vi } from "vitest";
import { updateMap } from "../../../src/data/usecases/map/update-map.js";
import { updateMapController } from "../../../src/http/controllers/map/update-map.js";

vi.mock("../../../src/data/usecases/map/update-map.js", () => ({
  updateMap: vi.fn()
}));

describe("updateMapController", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockRequest = (params, body) => ({
    params,
    body
  });

  const mockReply = () => {
    const reply = {};
    reply.status = vi.fn().mockReturnValue(reply);
    reply.send = vi.fn().mockReturnValue(reply);
    return reply;
  };

  it("should return 200 and the updated map when the update is successful", async () => {
    const mapId = "1234";
    const mapData = {
      name: "Updated Map",
      dimensions: { width: 100, height: 100 },
      obstacles: [{ x: 10, y: 10 }]
    };
    const updatedMap = { ...mapData, id: mapId };

    updateMap.mockResolvedValue(updatedMap);

    const request = mockRequest({ id: mapId }, mapData);
    const reply = mockReply();

    await updateMapController(request, reply);

    expect(updateMap).toHaveBeenCalledWith(mapId, mapData);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(updatedMap);
  });

  it("should return 404 with an error message if the map is not found", async () => {
    const mapId = "1234";
    const mapData = {
      name: "Non-existent Map",
      dimensions: { width: 100, height: 100 },
      obstacles: [{ x: 10, y: 10 }]
    };
    const errorMessage = "Map not found";

    updateMap.mockRejectedValue(new Error(errorMessage));

    const request = mockRequest({ id: mapId }, mapData);
    const reply = mockReply();

    await updateMapController(request, reply);

    expect(updateMap).toHaveBeenCalledWith(mapId, mapData);
    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: errorMessage })
    );
  });
});
