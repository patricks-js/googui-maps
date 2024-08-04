import { beforeEach, describe, expect, it, vi } from "vitest";
import { Waypoint } from "../../../src/data/models/waypoint.js";
import { deleteWaypoint } from "../../../src/data/usecases/waypoint/delete-waypoint.js";
import { NotFoundError, ServerError } from "../../../src/http/errors.js";

// Mock the Waypoint model
vi.mock("../../../src/data/models/waypoint.js", () => ({
  Waypoint: {
    findById: vi.fn(),
    findByIdAndDelete: vi.fn()
  }
}));

describe("deleteWaypoint", () => {
  const waypointId = "123";
  const waypointData = {
    id: waypointId,
    mapId: "map1",
    position: { x: 10, y: 20 },
    name: "Waypoint 1"
  };

  beforeEach(() => {
    Waypoint.findById.mockReset();
    Waypoint.findByIdAndDelete.mockReset();
  });

  it("should delete a waypoint successfully when the waypoint exists", async () => {
    Waypoint.findById.mockResolvedValue(waypointData); // Simulate existing waypoint
    Waypoint.findByIdAndDelete.mockResolvedValue(waypointData); // Simulate successful deletion

    await deleteWaypoint(waypointId);

    expect(Waypoint.findById).toHaveBeenCalledWith(waypointId);
    expect(Waypoint.findByIdAndDelete).toHaveBeenCalledWith(waypointId);
  });

  it("should throw a NotFoundError when the waypoint does not exist", async () => {
    Waypoint.findById.mockResolvedValue(null); // Simulate waypoint not found

    await expect(deleteWaypoint(waypointId)).rejects.toThrow(NotFoundError);
    await expect(deleteWaypoint(waypointId)).rejects.toThrow(
      `Waypoint with id ${waypointId} not found`
    );

    expect(Waypoint.findById).toHaveBeenCalledWith(waypointId);
    expect(Waypoint.findByIdAndDelete).not.toHaveBeenCalled();
  });

  it("should throw a ServerError when there is an error during deletion", async () => {
    Waypoint.findById.mockResolvedValue(waypointData); // Simulate existing waypoint
    Waypoint.findByIdAndDelete.mockRejectedValue(new Error("Database error")); // Simulate deletion error

    await expect(deleteWaypoint(waypointId)).rejects.toThrow(ServerError);
    await expect(deleteWaypoint(waypointId)).rejects.toThrow(
      "Error at deleting Waypoint"
    );

    expect(Waypoint.findById).toHaveBeenCalledWith(waypointId);
    expect(Waypoint.findByIdAndDelete).toHaveBeenCalledWith(waypointId);
  });
});
