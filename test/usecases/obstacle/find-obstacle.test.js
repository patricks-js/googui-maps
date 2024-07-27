import { afterEach, describe, expect, it, vi } from "vitest";
import { Obstacle } from "../../../src/data/models/obstacle.js";
import { findObstacle } from "../../../src/data/usecases/obstacle/find-obstacle.js";

vi.mock("../../../src/data/models/obstacle.js", () => ({
  Obstacle: {
    findById: vi.fn()
  }
}));

describe("findObstacle", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return an obstacle when found by id", async () => {
    const id = "123";
    const obstacle = { id: "123", x: 10, y: 20 };

    Obstacle.findById.mockResolvedValue(obstacle);

    const result = await findObstacle(id);

    expect(Obstacle.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(obstacle);
  });

  it("should throw an error when fetching the obstacle fails", async () => {
    const id = "123";
    const errorMessage = "Error fetching obstacles: ";

    Obstacle.findById.mockRejectedValue(new Error(errorMessage));

    await expect(findObstacle(id)).rejects.toThrow(`${errorMessage}`);

    expect(Obstacle.findById).toHaveBeenCalledWith(id);
  });
});
