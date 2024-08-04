import { beforeEach, describe, expect, it, vi } from "vitest";
import { Waypoint } from "../../../src/data/models/waypoint.js";
import { findWaypoint } from "../../../src/data/usecases/waypoint/find-waypoint.js";
import { NotFoundError } from "../../../src/http/errors.js";

// Mock the Waypoint model
vi.mock("../../../src/data/models/waypoint.js", () => ({
  Waypoint: {
    findById: vi.fn()
  }
}));

describe("findWaypoint", () => {
  const waypointId = "123";
  const waypointData = {
    id: waypointId,
    mapId: "map1",
    position: { x: 10, y: 20 },
    name: "Waypoint 1"
  };

  beforeEach(() => {
    Waypoint.findById.mockReset();
  });

  it("should return a waypoint successfully when the waypoint exists", async () => {
    Waypoint.findById.mockResolvedValue(waypointData); // Simulate an existing waypoint

    const result = await findWaypoint(waypointId);

    expect(Waypoint.findById).toHaveBeenCalledWith(waypointId);
    expect(result).toEqual(waypointData);
  });

  it("should throw a NotFoundError when the waypoint does not exist", async () => {
    Waypoint.findById.mockResolvedValue(null); // Simulate waypoint not found

    await expect(findWaypoint(waypointId)).rejects.toThrow(NotFoundError);
    await expect(findWaypoint(waypointId)).rejects.toThrow(
      `Waypoint with id ${waypointId} not found`
    );

    expect(Waypoint.findById).toHaveBeenCalledWith(waypointId);
  });
});
