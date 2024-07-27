import { beforeEach, describe, expect, it, vi } from "vitest";
import { Path } from "../../../src/data/models/path.js";
import { updatePath } from "../../../src/data/usecases/path/update-path.js";

vi.mock("../../../src/data/models/path.js");

describe("updatePath", () => {
  const mockPath = {
    _id: "123",
    distance: 100,
    start: "A",
    end: "B"
  };

  const updates = {
    distance: 200
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should update and return the path if it exists", async () => {
    const updatedPath = { ...mockPath, ...updates };
    Path.findByIdAndUpdate = vi.fn().mockResolvedValue(updatedPath);

    const result = await updatePath(mockPath._id, updates);

    expect(Path.findByIdAndUpdate).toHaveBeenCalledWith(mockPath._id, updates, {
      new: true
    });
    expect(result).toEqual(updatedPath);
  });

  it("should throw an error if the path does not exist", async () => {
    Path.findByIdAndUpdate = vi.fn().mockResolvedValue(null);

    await expect(updatePath(mockPath._id, updates)).rejects.toThrow(
      "Error updating path"
    );

    expect(Path.findByIdAndUpdate).toHaveBeenCalledWith(mockPath._id, updates, {
      new: true
    });
  });

  it("should throw an error if updating the path fails", async () => {
    Path.findByIdAndUpdate = vi
      .fn()
      .mockRejectedValue(new Error("Error updating path"));

    await expect(updatePath(mockPath._id, updates)).rejects.toThrow(
      "Error updating path"
    );

    expect(Path.findByIdAndUpdate).toHaveBeenCalledWith(mockPath._id, updates, {
      new: true
    });
  });
});
