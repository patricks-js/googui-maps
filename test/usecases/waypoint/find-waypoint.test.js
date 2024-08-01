import { describe, expect, it, vi } from "vitest";
import { Waypoint } from "../../../src/data/models/waypoint.js";
import { findWaypoint } from "../../../src/data/usecases/waypoint/find-waypoint.js";

vi.mock("../../../src/data/models/waypoint.js");

describe("findWaypoint", () => {
  it("should return a waypoint if found", async () => {
    const id = "12345";
    const waypoint = { _id: id, name: "Sample Waypoint" };
    Waypoint.findById.mockResolvedValue(waypoint);

    const result = await findWaypoint(id);

    expect(Waypoint.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(waypoint);
  });

  it("should throw an error if the waypoint is not found", async () => {
    const id = "nonexistent-id";
    Waypoint.findById.mockResolvedValue(null);

    await expect(findWaypoint(id)).rejects.toThrow("Waypoint not find");

    expect(Waypoint.findById).toHaveBeenCalledWith(id);
  });

  it("should throw an error if there is a database error", async () => {
    const id = "12345";
    Waypoint.findById.mockRejectedValue(new Error("Database error"));

    await expect(findWaypoint(id)).rejects.toThrow("Database error");

    expect(Waypoint.findById).toHaveBeenCalledWith(id);
  });
});
