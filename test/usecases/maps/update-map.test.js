import { afterEach, describe, expect, it, vi } from "vitest";
import { Maps } from "../../../src/data/models/map.js";
import { updateMap } from "../../../src/data/usecases/map/update-map.js";

vi.mock("../../../src/data/models/map.js", () => ({
  Maps: {
    findByIdAndUpdate: vi.fn()
  }
}));

describe("updateMap", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should update an existing map", async () => {
    const id = "1234";
    const newMap = {
      name: "Updated Map",
      dimensions: {
        width: 200,
        height: 200
      },
      obstacles: [
        { x: 15, y: 15 },
        { x: 25, y: 25 }
      ]
    };

    const updatedMap = {
      id: "1234",
      name: "Updated Map",
      dimensions: {
        width: 200,
        height: 200
      },
      obstacles: [
        { x: 15, y: 15 },
        { x: 25, y: 25 }
      ]
    };

    Maps.findByIdAndUpdate.mockResolvedValue(updatedMap);

    const result = await updateMap(id, newMap);

    expect(Maps.findByIdAndUpdate).toHaveBeenCalledWith(id, newMap, {
      new: true
    });
    expect(result).toEqual(updatedMap);
  });

  it("should throw an error when update fails", async () => {
    const id = "1234";
    const newMap = {
      name: "Updated Map",
      dimensions: {
        width: 200,
        height: 200
      },
      obstacles: [
        { x: 15, y: 15 },
        { x: 25, y: 25 }
      ]
    };

    Maps.findByIdAndUpdate.mockRejectedValue(new Error("Error update map"));

    await expect(updateMap(id, newMap)).rejects.toThrow("Error update map");

    expect(Maps.findByIdAndUpdate).toHaveBeenCalledWith(id, newMap, {
      new: true
    });
  });
});
