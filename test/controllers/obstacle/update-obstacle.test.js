import { describe, expect, it, vi } from "vitest";
import { updateObstacle } from "../../../src/data/usecases/obstacle/update-obstacle.js";
import { updateObstacleController } from "../../../src/http/controllers/obstacle/update-obstacle.js";

vi.mock("../../../src/data/usecases/obstacle/update-obstacle.js", () => ({
  updateObstacle: vi.fn()
}));

describe("updateObstacleController", () => {
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

  it("should return 200 and the updated obstacle when update is successful", async () => {
    const obstacleId = "1234";
    const requestData = {
      mapId: "map1",
      position: { x: 10, y: 20 },
      size: 5
    };
    const updatedObstacle = { ...requestData, id: obstacleId };

    updateObstacle.mockResolvedValue(updatedObstacle);

    const request = mockRequest({ id: obstacleId }, requestData);
    const reply = mockReply();

    await updateObstacleController(request, reply);

    expect(updateObstacle).toHaveBeenCalledWith(obstacleId, requestData);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(updatedObstacle);
  });

  it("should return 400 with validation error if the input data is invalid", async () => {
    const invalidData = {
      mapId: 1234, // Invalid type for mapId
      position: { x: "wrong", y: 20 }, // Invalid type for x
      size: "big" // Invalid type for size
    };

    const request = mockRequest({ id: "1234" }, invalidData);
    const reply = mockReply();

    await updateObstacleController(request, reply);

    expect(updateObstacle).not.toHaveBeenCalled();
    expect(reply.status).toHaveBeenCalledWith(400);

    // Ajustar a verificação para corresponder ao formato do erro de validação
    expect(reply.send).toHaveBeenCalledWith({
      message: "Error updating obstacle: ",
      error: expect.stringContaining("invalid_type")
    });
  });

  it("should return 400 with an error message if updating the obstacle fails", async () => {
    const obstacleId = "1234";
    const requestData = {
      mapId: "map1",
      position: { x: 10, y: 20 },
      size: 5
    };
    const error = new Error("Update failed");

    updateObstacle.mockRejectedValue(error);

    const request = mockRequest({ id: obstacleId }, requestData);
    const reply = mockReply();

    await updateObstacleController(request, reply);

    expect(updateObstacle).toHaveBeenCalledWith(obstacleId, requestData);
    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith({
      message: "Error updating obstacle: ",
      error: error.message
    });
  });
});
