import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { findObstacle } from "../../../src/data/usecases/obstacle/find-obstacle.js";
import { findObstacleController } from "../../../src/http/controllers/obstacle/find-obstacle.js";

vi.mock("../../../src/data/usecases/obstacle/find-obstacle.js", () => ({
  findObstacle: vi.fn()
}));

describe("findObstacleController", () => {
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

  it("should return 200 and the obstacle when found", async () => {
    const validId = "1234";
    const obstacle = {
      id: validId,
      position: {
        x: 10,
        y: 10
      },
      size: 5
    };

    findObstacle.mockResolvedValue(obstacle);

    const request = mockRequest({ id: validId });
    const reply = mockReply();

    await findObstacleController(request, reply);

    expect(findObstacle).toHaveBeenCalledWith(validId);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(obstacle);
  });

  it("should return 400 with validation error if the input data is invalid", async () => {
    const invalidParams = { id: 1234 }; // Invalid type for id

    const request = mockRequest(invalidParams);
    const reply = mockReply();

    await findObstacleController(request, reply);

    expect(findObstacle).not.toHaveBeenCalled();
    expect(reply.status).toHaveBeenCalledWith(400);

    expect(reply.send).toHaveBeenCalledWith({
      message: "Error fetching obstacle: ",
      error: expect.stringContaining("Expected string, received number")
    });
  });

  it("should return 400 with an error message if fetching the obstacle fails", async () => {
    const validId = "1234";
    const error = new Error("Error fetching obstacle");
    findObstacle.mockRejectedValue(error);

    const request = mockRequest({ id: validId });
    const reply = mockReply();

    await findObstacleController(request, reply);

    expect(findObstacle).toHaveBeenCalledWith(validId);
    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith({
      message: "Error fetching obstacle: ",
      error: error.message
    });
  });
});
