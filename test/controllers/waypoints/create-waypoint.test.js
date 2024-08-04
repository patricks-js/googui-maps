import { beforeEach, describe, expect, it, vi } from "vitest";
import { Waypoint } from "../../../src/data/models/waypoint.js";
import { createWaypoint } from "../../../src/data/usecases/waypoint/create-waypoint.js";
import { BadRequestError } from "../../../src/http/errors.js";

// Mock the Waypoint model
vi.mock("../../../src/data/models/waypoint.js", () => ({
  Waypoint: {
    findOne: vi.fn(),
    create: vi.fn()
  }
}));

describe("createWaypoint", () => {
  let waypointData;

  beforeEach(() => {
    waypointData = {
      mapId: "map1",
      position: { x: 10, y: 20 },
      name: "Waypoint 1"
    };

    Waypoint.findOne.mockReset();
    Waypoint.create.mockReset();
  });

  it("should create a waypoint successfully when no waypoint with the same name exists", async () => {
    Waypoint.findOne.mockResolvedValue(null); // No existing waypoint
    Waypoint.create.mockResolvedValue(waypointData); // Simulate successful creation

    const result = await createWaypoint(waypointData);

    expect(Waypoint.findOne).toHaveBeenCalledWith({ name: waypointData.name });
    expect(Waypoint.create).toHaveBeenCalledWith(waypointData);
    expect(result).toEqual(waypointData);
  });

  it("should throw a BadRequestError when a waypoint with the same name already exists", async () => {
    Waypoint.findOne.mockResolvedValue(waypointData); // Existing waypoint with the same name

    await expect(createWaypoint(waypointData)).rejects.toThrow(BadRequestError);
    await expect(createWaypoint(waypointData)).rejects.toThrow(
      "Waypoint already exists"
    );

    expect(Waypoint.findOne).toHaveBeenCalledWith({ name: waypointData.name });
    expect(Waypoint.create).not.toHaveBeenCalled();
  });
});
