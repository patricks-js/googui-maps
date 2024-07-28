import { afterEach, describe, expect, it, vi } from "vitest";
import { Maps } from "../../../src/data/models/map.js";
import { Obstacle } from "../../../src/data/models/obstacle.js";
import { createObstacle } from "../../../src/data/usecases/obstacle/create-obstacle.js";

vi.mock("../../../src/data/models/map.js", () => ({
  Maps: {
    findById: vi.fn()
  }
}));

vi.mock("../../../src/data/models/obstacle.js", () => ({
  Obstacle: {
    create: vi.fn()
  }
}));

describe("createObstacle", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create an obstacle if the map exists", async () => {
    const obstacle = {
      mapId: "123",
      x: 10,
      y: 20
    };

    Maps.findById.mockResolvedValue({ id: "123", name: "Test Map" });
    Obstacle.create.mockResolvedValue(obstacle);

    const result = await createObstacle(obstacle);

    expect(Maps.findById).toHaveBeenCalledWith(obstacle.mapId);
    expect(Obstacle.create).toHaveBeenCalledWith(obstacle);
    expect(result).toEqual(obstacle);
  });

  it("should throw an error if the map does not exist", async () => {
    const obstacle = {
      mapId: "123",
      x: 10,
      y: 20
    };

    Maps.findById.mockResolvedValue(null);

    await expect(createObstacle(obstacle)).rejects.toThrow(
      "Map not found for obstacle"
    );

    expect(Maps.findById).toHaveBeenCalledWith(obstacle.mapId);
    expect(Obstacle.create).not.toHaveBeenCalled();
  });

  it("should throw an error if there is an issue creating the obstacle", async () => {
    const obstacle = {
      mapId: "123",
      x: 10,
      y: 20
    };

    Maps.findById.mockResolvedValue({ id: "123", name: "Test Map" });
    Obstacle.create.mockRejectedValue(new Error("Error creating obstacle"));

    await expect(createObstacle(obstacle)).rejects.toThrow(
      "Error creating obstacle"
    );

    expect(Maps.findById).toHaveBeenCalledWith(obstacle.mapId);
    expect(Obstacle.create).toHaveBeenCalledWith(obstacle);
  });
});
