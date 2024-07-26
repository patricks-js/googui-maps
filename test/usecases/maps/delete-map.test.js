import { afterEach, describe, expect, it, vi } from "vitest";
import { Maps } from "../../../src/data/models/map.js";
import { deleteMap } from "../../../src/data/usecases/maps/delete-map.js";

vi.mock("../../../src/data/models/map.js", () => ({
  Maps: {
    findByIdAndDelete: vi.fn()
  }
}));

describe("deleteMap", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should delete an existing map", async () => {
    const id = "1234";
    const deletedMap = {
      id: "1234",
      name: "Test Map",
      dimensions: {
        width: 100,
        height: 100
      },
      obstacles: [
        { x: 10, y: 10 },
        { x: 20, y: 20 }
      ]
    };

    Maps.findByIdAndDelete.mockResolvedValue(deletedMap);

    const result = await deleteMap(id);

    expect(Maps.findByIdAndDelete).toHaveBeenCalledWith(id);
    expect(result).toEqual(deletedMap);
  });

  it("should throw an error when deletion fails", async () => {
    const id = "1234";
    Maps.findByIdAndDelete.mockRejectedValue(
      new Error("Error deleting map: Error: Deletion failed")
    );

    await expect(deleteMap(id)).rejects.toThrow(
      "Error deleting map: Error: Deletion failed"
    );

    expect(Maps.findByIdAndDelete).toHaveBeenCalledWith(id);
  });
});
