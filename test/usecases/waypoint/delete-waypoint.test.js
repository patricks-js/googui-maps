import { describe, expect, it, vi } from "vitest";
import { Waypoint } from "../../../src/data/models/waypoint.js";
import { deleteWaypoint } from "../../../src/data/usecases/waypoint/delete-waypoint.js";

vi.mock("../../../src/data/models/waypoint.js");

describe("deleteWaypoint", () => {
  it("should delete a waypoint successfully", async () => {
    const id = "12345";
    const deletedWaypoint = { _id: id, name: "Waypoint to delete" };
    Waypoint.findByIdAndDelete.mockResolvedValue(deletedWaypoint);

    const result = await deleteWaypoint(id);

    expect(Waypoint.findByIdAndDelete).toHaveBeenCalledWith(id);
    expect(result).toEqual(deletedWaypoint);
  });

  it("should throw an error if the waypoint is not found", async () => {
    const id = "nonexistent-id";
    Waypoint.findByIdAndDelete.mockResolvedValue(null);

    await expect(deleteWaypoint(id)).rejects.toThrow("Waypoint not found");

    expect(Waypoint.findByIdAndDelete).toHaveBeenCalledWith(id);
  });

  it("should handle errors thrown by findByIdAndDelete", async () => {
    const id = "12345";
    Waypoint.findByIdAndDelete.mockRejectedValue(new Error("Database error"));

    await expect(deleteWaypoint(id)).rejects.toThrow("Database error");

    expect(Waypoint.findByIdAndDelete).toHaveBeenCalledWith(id);
  });
});
