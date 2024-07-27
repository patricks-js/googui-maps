import { describe, expect, it, vi } from "vitest";
import { updateWaypoint } from "../../../src/data/usecases/waypoint/update-waypoint.js";
import { updateWaypointController } from "../../../src/http/controllers/waypoint/update-waypoint.js";

vi.mock("../../../src/data/usecases/waypoint/update-waypoint.js");

describe("updateWaypointController", () => {
  it("should return 200 and the updated waypoint when update is successful", async () => {
    const updatedWaypoint = {
      id: "123",
      mapId: "map1",
      position: { x: 15, y: 25 },
      name: "Updated Waypoint"
    };
    updateWaypoint.mockResolvedValue(updatedWaypoint);

    const request = {
      params: { id: "123" },
      body: {
        mapId: "map1",
        position: { x: 15, y: 25 },
        name: "Updated Waypoint"
      }
    };
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    };

    await updateWaypointController(request, reply);

    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(updatedWaypoint);
  });

  it("should return 404 if the waypoint is not found for update", async () => {
    updateWaypoint.mockRejectedValue(new Error("Waypoint not found"));

    const request = {
      params: { id: "123" },
      body: {
        mapId: "123",
        position: { x: 15, y: 25 },
        name: "Updated Waypoint"
      }
    };
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    };

    await updateWaypointController(request, reply);

    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith(new Error("Waypoint not found"));
  });
});
