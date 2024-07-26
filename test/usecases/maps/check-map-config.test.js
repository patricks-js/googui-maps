import { afterEach, describe, expect, it, vi } from "vitest";
import { Obstacle } from "../../../src/data/models/obstacle.js";
import { Waypoint } from "../../../src/data/models/waypoint.js";
import { checkMapConfiguration } from "../../../src/data/usecases/maps/check-map-config.js";

vi.mock("../../../src/data/models/obstacle.js", () => ({
  Obstacle: {
    find: vi.fn()
  }
}));

vi.mock("../../../src/data/models/waypoint.js", () => ({
  Waypoint: {
    find: vi.fn()
  }
}));

describe("checkMapConfiguration", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should throw an error if there are no obstacles", async () => {
    const mapId = "1234";
    Obstacle.find.mockResolvedValue([]);
    Waypoint.find.mockResolvedValue([{ id: "1", mapId }]);

    await expect(checkMapConfiguration(mapId)).rejects.toThrow(
      "Map is not configured with obstacles or waypoints"
    );

    expect(Obstacle.find).toHaveBeenCalledWith({ mapId });
    expect(Waypoint.find).toHaveBeenCalledWith({ mapId });
  });

  it("should throw an error if there are no waypoints", async () => {
    const mapId = "1234";
    Obstacle.find.mockResolvedValue([{ id: "1", mapId }]);
    Waypoint.find.mockResolvedValue([]);

    await expect(checkMapConfiguration(mapId)).rejects.toThrow(
      "Map is not configured with obstacles or waypoints"
    );

    expect(Obstacle.find).toHaveBeenCalledWith({ mapId });
    expect(Waypoint.find).toHaveBeenCalledWith({ mapId });
  });

  it("should throw an error if there are no obstacles and no waypoints", async () => {
    const mapId = "1234";
    Obstacle.find.mockResolvedValue([]);
    Waypoint.find.mockResolvedValue([]);

    await expect(checkMapConfiguration(mapId)).rejects.toThrow(
      "Map is not configured with obstacles or waypoints"
    );

    expect(Obstacle.find).toHaveBeenCalledWith({ mapId });
    expect(Waypoint.find).toHaveBeenCalledWith({ mapId });
  });

  it("should return a success message if there are obstacles and waypoints", async () => {
    const mapId = "1234";
    Obstacle.find.mockResolvedValue([{ id: "1", mapId }]);
    Waypoint.find.mockResolvedValue([{ id: "1", mapId }]);

    const result = await checkMapConfiguration(mapId);

    expect(result).toEqual({
      message: "The map is set up correctly with obstacles and stopping points."
    });
    expect(Obstacle.find).toHaveBeenCalledWith({ mapId });
    expect(Waypoint.find).toHaveBeenCalledWith({ mapId });
  });
});
