import { describe, expect, it, vi } from "vitest";
import { verifyMap } from "../../../src/data/usecases/map/verify-map.js";
import { verifyMapController } from "../../../src/http/controllers/map/verify-map.js";

vi.mock("../../../src/data/usecases/map/verify-map.js", () => ({
  verifyMap: vi.fn()
}));

describe("verifyMapController", () => {
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

  it("should return 200 when the map and points are verified successfully", async () => {
    const requestBody = {
      map_id: "map123",
      start_point: { x: 1, y: 1 },
      destination_point: { x: 2, y: 2 }
    };

    verifyMap.mockResolvedValue();

    const request = mockRequest(requestBody);
    const reply = mockReply();

    await verifyMapController(request, reply);

    expect(verifyMap).toHaveBeenCalledWith(
      requestBody.map_id,
      requestBody.start_point,
      requestBody.destination_point
    );
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith({
      message: "Os pontos e o mapa são válidos e existem no banco de dados."
    });
  });

  it("should return 400 with a validation error if the input validation fails", async () => {
    const invalidRequestBody = {
      map_id: 123, // map_id should be a string
      start_point: { x: 1, y: "invalid" }, // y should be a number
      destination_point: { x: 2, y: 2 }
    };

    const request = mockRequest(invalidRequestBody);
    const reply = mockReply();

    await verifyMapController(request, reply);

    expect(verifyMap).not.toHaveBeenCalled();
    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith(expect.any(String));
  });

  it("should return 400 with an error message if verifyMap throws an error", async () => {
    const requestBody = {
      map_id: "map123",
      start_point: { x: 1, y: 1 },
      destination_point: { x: 2, y: 2 }
    };
    const errorMessage = "Map verification failed";

    verifyMap.mockRejectedValue(new Error(errorMessage));

    const request = mockRequest(requestBody);
    const reply = mockReply();

    await verifyMapController(request, reply);

    expect(verifyMap).toHaveBeenCalledWith(
      requestBody.map_id,
      requestBody.start_point,
      requestBody.destination_point
    );
    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith(errorMessage);
  });
});
