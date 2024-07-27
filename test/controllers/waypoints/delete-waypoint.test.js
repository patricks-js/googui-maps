import { describe, expect, it, vi } from "vitest";
import { deleteWaypoint } from "../../../src/data/usecases/waypoint/delete-waypoint.js";
import { deleteWaypointController } from "../../../src/http/controllers/waypoint/delete-waypoint.js";

vi.mock("../../../src/data/usecases/waypoint/delete-waypoint.js");

describe("deleteWaypointController", () => {
  it("should return 204 when the waypoint is deleted successfully", async () => {
    deleteWaypoint.mockResolvedValue();

    const request = { params: { id: "123" } };
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    };

    await deleteWaypointController(request, reply);

    expect(reply.status).toHaveBeenCalledWith(204);
    expect(reply.send).toHaveBeenCalled();
  });

  it("should return 404 if the waypoint is not found", async () => {
    deleteWaypoint.mockRejectedValue(new Error("Waypoint not found"));

    const request = { params: { id: 0 } };
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    };

    await deleteWaypointController(request, reply);

    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalled();
  });
});
