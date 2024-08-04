import { beforeEach, describe, expect, it, vi } from "vitest";
import { findObstacle } from "../../../src/data/usecases/obstacle/find-obstacle.js";
import { findObstacleController } from "../../../src/http/controllers/obstacle/find-obstacle.js";
import { validators } from "../../../src/http/validators.js";

vi.mock("../../../src/data/usecases/obstacle/find-obstacle.js", () => ({
  findObstacle: vi.fn()
}));

vi.mock("../../../src/http/validators.js", () => ({
  validators: {
    idParamSchema: vi.fn()
  }
}));

describe("findObstacleController", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = {
      params: { id: "obstacle123" }
    };

    reply = {
      send: vi.fn(),
      status: vi.fn(() => reply)
    };

    validators.idParamSchema.mockReturnValue({ id: "obstacle123" });
  });

  it("should find the obstacle successfully", async () => {
    const obstacleData = {
      id: "obstacle123",
      mapId: "map123",
      position: { x: 5, y: 5 },
      size: 10
    };
    findObstacle.mockResolvedValue(obstacleData);

    await findObstacleController(request, reply);

    expect(validators.idParamSchema).toHaveBeenCalledWith(request.params);
    expect(findObstacle).toHaveBeenCalledWith("obstacle123");
  });

  it("should handle errors from findObstacle", async () => {
    findObstacle.mockRejectedValue(new Error("Find Obstacle Error"));

    try {
      await findObstacleController(request, reply);
    } catch (e) {
      expect(e.message).toBe("Find Obstacle Error");
    }
  });
});
