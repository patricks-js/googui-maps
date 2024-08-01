import { describe, expect, it, vi } from "vitest";
import { createWaypoint } from "../../../src/data/usecases/waypoint/create-waypoint.js";
import { createWaypointController } from "../../../src/http/controllers/waypoint/create-waypoint.js";

vi.mock("../../../src/data/usecases/waypoint/create-waypoint.js");

describe("createWaypointController", () => {
  it("should return 201 and the new waypoint when creation is successful", async () => {
    const newWaypoint = {
      id: "123",
      mapId: "map123",
      position: { x: 10, y: 20 },
      name: "Waypoint 1"
    };
    createWaypoint.mockResolvedValue(newWaypoint);

    const request = {
      body: { mapId: "map123", position: { x: 10, y: 20 }, name: "Waypoint 1" }
    };
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    };

    await createWaypointController(request, reply);

    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith(newWaypoint);
  });

  it("should return 400 if the waypoint data is invalid", async () => {
    const request = {
      body: { mapId: 0, position: { x: 10, y: 20 }, name: "" }
    };
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    };

    await createWaypointController(request, reply);

    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalled();
  });
});
