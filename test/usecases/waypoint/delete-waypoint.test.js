import { describe, expect, it, vi } from "vitest";
import { Waypoint } from "../../../src/data/models/waypoint.js";
import { deleteWaypoint } from "../../../src/data/usecases/waypoint/delete-waypoint.js";

vi.mock("../../../src/data/models/waypoint.js");

describe("deleteWaypoint", () => {
  it("should delete a waypoint successfully", async () => {
    const id = "12345";
    const deletedWaypoint = { _id: id, name: "Waypoint to delete" };

    Waypoint.findById = vi.fn().mockResolvedValue(deletedWaypoint);
    Waypoint.findByIdAndDelete = vi.fn().mockResolvedValue(deletedWaypoint);

    await deleteWaypoint(id);
    expect(Waypoint.findById).toHaveBeenCalledWith(id);
    expect(Waypoint.findByIdAndDelete).toHaveBeenCalledWith(id);
  });

  it("should throw an error if the waypoint is not found", async () => {
    const id = "nonexistent-id";
    Waypoint.findById = vi.fn().mockResolvedValue(null);
    const expectedErrorMessage = `Waypoint with id ${id} not found`;

    await expect(deleteWaypoint(id)).rejects.toThrow(expectedErrorMessage);
  });

  it("should handle errors thrown by findByIdAndDelete", async () => {
    const id = "12345";
    Waypoint.findById = vi.fn().mockResolvedValue(id);
    Waypoint.findByIdAndDelete.mockRejectedValue(
      new Error("Error at deleting Waypoint")
    );

    await expect(deleteWaypoint(id)).rejects.toThrow(
      "Error at deleting Waypoint"
    );

    expect(Waypoint.findByIdAndDelete).toHaveBeenCalledWith(id);
  });
});
