import { describe, expect, it, vi } from "vitest";
import { findMapById } from "../../../src/data/usecases/map/find-map.js";
import { findMapByIdController } from "../../../src/http/controllers/map/find-map.js";

vi.mock("../../../src/data/usecases/map/find-map.js", () => ({
  findMapById: vi.fn()
}));

describe("findMapByIdController", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockRequest = (params) => ({
    params
  });

  const mockReply = () => {
    const reply = {};
    reply.status = vi.fn().mockReturnValue(reply);
    reply.send = vi.fn().mockReturnValue(reply);
    return reply;
  };

  it("should return 200 and the map when the map is found", async () => {
    const mapId = "1234";
    const mapData = { id: mapId, name: "Test Map" };

    findMapById.mockResolvedValue(mapData);

    const request = mockRequest({ id: mapId });
    const reply = mockReply();

    await findMapByIdController(request, reply);

    expect(findMapById).toHaveBeenCalledWith(mapId);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(mapData);
  });

  it("should return 404 with an error message if the map is not found", async () => {
    const mapId = "1234";
    const errorMessage = "Map not found";

    findMapById.mockRejectedValue(new Error(errorMessage));

    const request = mockRequest({ id: mapId });
    const reply = mockReply();

    await findMapByIdController(request, reply);

    expect(findMapById).toHaveBeenCalledWith(mapId);
    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: errorMessage })
    );
  });

  it("should return 400 with a validation error if the input validation fails", async () => {
    const invalidParams = { id: 1234 }; // id should be a string
    const request = mockRequest(invalidParams);
    const reply = mockReply();

    await findMapByIdController(request, reply);

    expect(findMapById).not.toHaveBeenCalled();
    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith({
      error: "Bad Request",
      message: [
        {
          path: ["id"],
          message: "Expected string, received number",
          code: "invalid_type",
          expected: "string",
          received: "number"
        }
      ]
    });
  });
});
