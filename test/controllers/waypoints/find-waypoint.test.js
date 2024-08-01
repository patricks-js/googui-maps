import { describe, expect, it, vi } from "vitest";
import { findWaypoint } from "../../../src/data/usecases/waypoint/find-waypoint.js";
import { findWaypointController } from "../../../src/http/controllers/waypoint/find-waypoint.js";

vi.mock("../../../src/data/usecases/waypoint/find-waypoint.js");

describe("findWaypointController", () => {
  it("should return 200 and the waypoint when found successfully", async () => {
    const waypoint = {
      id: "123",
      mapId: "map1",
      position: { x: 10, y: 20 },
      name: "Waypoint A"
    };
    findWaypoint.mockResolvedValue(waypoint);

    const request = { params: { id: "123" } };
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    };

    await findWaypointController(request, reply);

    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(waypoint);
  });

  it("should return 400 if validation fails", async () => {
    const request = { params: { id: 0 } };
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    };

    await findWaypointController(request, reply);

    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith({
      error: "Bad Request",
      message: expect.any(Array) // Expect an array of errors
    });
  });

  it("should return 404 if the waypoint is not found", async () => {
    findWaypoint.mockRejectedValue(new Error("Waypoint not found"));

    const request = { params: { id: "nonexistent" } };
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    };

    await findWaypointController(request, reply);

    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith(new Error("Waypoint not found"));
  });
});
