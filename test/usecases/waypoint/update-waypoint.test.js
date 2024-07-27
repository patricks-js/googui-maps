import { describe, expect, it, vi } from "vitest";
import { Waypoint } from "../../../src/data/models/waypoint.js";
import { updateWaypoint } from "../../../src/data/usecases/waypoint/update-waypoint.js";

vi.mock("../../../src/data/models/waypoint.js");

describe("updateWaypoint", () => {
  it("should update and return the waypoint if successful", async () => {
    const id = "12345";
    const newWaypoint = {
      name: "Updated Waypoint",
      position: { x: 30, y: 40 }
    };
    const updatedWaypoint = { _id: id, ...newWaypoint };

    Waypoint.findByIdAndUpdate.mockResolvedValue(updatedWaypoint);

    const result = await updateWaypoint(id, newWaypoint);

    expect(Waypoint.findByIdAndUpdate).toHaveBeenCalledWith(id, newWaypoint, {
      new: true
    });
    expect(result).toEqual(updatedWaypoint);
  });

  it("should throw an error if the update fails", async () => {
    const id = "12345";
    const newWaypoint = {
      name: "Updated Waypoint",
      position: { x: 30, y: 40 }
    };

    Waypoint.findByIdAndUpdate.mockRejectedValue(
      new Error("Error updating waypoint")
    );

    await expect(updateWaypoint(id, newWaypoint)).rejects.toThrow(
      "Error updating waypoint"
    );

    expect(Waypoint.findByIdAndUpdate).toHaveBeenCalledWith(id, newWaypoint, {
      new: true
    });
  });

  it("should handle an invalid ID without crashing", async () => {
    const id = null;
    const newWaypoint = {
      name: "Updated Waypoint",
      position: { x: 30, y: 40 }
    };

    Waypoint.findByIdAndUpdate.mockImplementation(() => {
      throw new Error("Error updating waypoint");
    });

    await expect(updateWaypoint(id, newWaypoint)).rejects.toThrow(
      "Error updating waypoint"
    );
  });

  it("should handle an invalid newWaypoint without crashing", async () => {
    const id = "12345";
    const newWaypoint = null;

    Waypoint.findByIdAndUpdate.mockImplementation(() => {
      throw new Error("Error updating waypoint");
    });

    await expect(updateWaypoint(id, newWaypoint)).rejects.toThrow(
      "Error updating waypoint"
    );
  });

  it("should handle an ID that is not a string", async () => {
    const id = 12345;
    const newWaypoint = {
      name: "Updated Waypoint",
      position: { x: 30, y: 40 }
    };

    Waypoint.findByIdAndUpdate.mockImplementation(() => {
      throw new Error("Error updating waypoint");
    });

    await expect(updateWaypoint(id, newWaypoint)).rejects.toThrow(
      "Error updating waypoint"
    );
  });

  it("should handle a newWaypoint that is not an object", async () => {
    const id = "12345";
    const newWaypoint = "invalid waypoint";

    Waypoint.findByIdAndUpdate.mockImplementation(() => {
      throw new Error("Error updating waypoint");
    });

    await expect(updateWaypoint(id, newWaypoint)).rejects.toThrow(
      "Error updating waypoint"
    );
  });
});
