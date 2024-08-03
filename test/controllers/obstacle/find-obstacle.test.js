import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { findObstacle } from "../../../src/data/usecases/obstacle/find-obstacle.js";
import { findObstacleController } from "../../../src/http/controllers/obstacle/find-obstacle.js";
import { BadRequestError } from "../../../src/http/errors.js";

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

  it("should return 404 with an error message if fetching the obstacle fails", async () => {
    const validId = "1234";
    const errorMessage = "Error fetching obstacle";
    const error = new BadRequestError(errorMessage);
    findObstacle.mockRejectedValue(error);

    const request = mockRequest({ id: validId });
    const reply = mockReply();

    await findObstacleController(request, reply);

    expect(findObstacle).toHaveBeenCalledWith(validId);
    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: errorMessage })
    );
  });

  it("should return 400 with validation error if the input data is invalid", async () => {
    const invalidParams = { id: 1234 }; // Invalid type for id

    const request = mockRequest(invalidParams);
    const reply = mockReply();

    await findObstacleController(request, reply);

    expect(findObstacle).not.toHaveBeenCalled();
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
