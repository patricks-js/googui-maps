import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { deleteObstacle } from "../../../src/data/usecases/obstacle/delete-obstacle.js";
import { deleteObstacleController } from "../../../src/http/controllers/obstacle/delete-obstacle.js";

vi.mock("../../../src/data/usecases/obstacle/delete-obstacle.js", () => ({
  deleteObstacle: vi.fn()
}));

describe("deleteObstacleController", () => {
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

  it("should return 204 when an obstacle is successfully deleted", async () => {
    const validId = "1234";

    deleteObstacle.mockResolvedValue();

    const request = mockRequest({ id: validId });
    const reply = mockReply();

    await deleteObstacleController(request, reply);

    expect(deleteObstacle).toHaveBeenCalledWith(validId);
    expect(reply.status).toHaveBeenCalledWith(204);
    expect(reply.send).toHaveBeenCalled();
  });

  it("should return 404 with error message if the obstacle is not found", async () => {
    const invalidId = "9999";
    const error = new Error("Error deleting obstacle with id: 9999");

    deleteObstacle.mockRejectedValue(error);

    const request = mockRequest({ id: invalidId });
    const reply = mockReply();

    await deleteObstacleController(request, reply);

    expect(deleteObstacle).toHaveBeenCalledWith(invalidId);
    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith(error);
  });

  it("should return 400 with validation error if the input data is invalid", async () => {
    const invalidParams = { id: 1234 };

    const request = mockRequest(invalidParams);
    const reply = mockReply();

    await deleteObstacleController(request, reply);

    expect(deleteObstacle).not.toHaveBeenCalled();
    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith(expect.any(z.ZodError));
  });
});
