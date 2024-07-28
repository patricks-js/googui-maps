import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { createObstacle } from "../../../src/data/usecases/obstacle/create-obstacle.js";
import { createObstacleController } from "../../../src/http/controllers/obstacle/create-obstacle.js";
import { BadRequestError } from "../../../src/http/errors.js";

vi.mock("../../../src/data/usecases/obstacle/create-obstacle.js", () => ({
  createObstacle: vi.fn()
}));

describe("createObstacleController", () => {
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

  it("should return 201 when an obstacle is successfully created", async () => {
    const validObstacle = {
      mapId: "1234",
      position: {
        x: 15,
        y: 15
      },
      size: 10
    };

    const createdObstacle = {
      id: "5678",
      ...validObstacle
    };

    createObstacle.mockResolvedValue(createdObstacle);

    const request = mockRequest(validObstacle);
    const reply = mockReply();

    await createObstacleController(request, reply);

    expect(createObstacle).toHaveBeenCalledWith(validObstacle);
    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith(createdObstacle);
  });

  it("should return 400 with validation error if the input data is invalid", async () => {
    const invalidObstacle = {
      mapId: "1234",
      position: {
        x: "not-a-number",
        y: 15
      },
      size: "not-a-number"
    };

    const request = mockRequest(invalidObstacle);
    const reply = mockReply();

    await createObstacleController(request, reply);

    expect(createObstacle).not.toHaveBeenCalled();
    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith(expect.any(z.ZodError));
  });

  it("should return 400 with an error message if obstacle creation fails", async () => {
    const validObstacle = {
      mapId: "1234",
      position: {
        x: 15,
        y: 15
      },
      size: 10
    };

    const error = new BadRequestError("Error creating obstacle");
    createObstacle.mockRejectedValue(error);

    const request = mockRequest(validObstacle);
    const reply = mockReply();

    await createObstacleController(request, reply);

    expect(createObstacle).toHaveBeenCalledWith(validObstacle);
    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith(error);
  });
});
