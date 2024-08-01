import { beforeEach, describe, expect, it, vi } from "vitest";
import { Path } from "../../../src/data/models/path.js";
import { updatePath } from "../../../src/data/usecases/path/update-path.js";
import { ServerError } from "../../../src/http/errors.js";

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
    Path.findById = vi.fn().mockResolvedValue(updatedPath._id);
    Path.findByIdAndUpdate = vi.fn().mockResolvedValue(updatedPath);

    const result = await updatePath(mockPath._id, updates);

    expect(Path.findByIdAndUpdate).toHaveBeenCalledWith(mockPath._id, updates, {
      new: true
    });
    expect(result).toEqual(updatedPath);
  });

  it("should throw an error if the path does not exist", async () => {
    Path.findById = vi.fn().mockResolvedValue(null);

    await expect(updatePath(mockPath._id, updates)).rejects.toThrow(
      `Path with id ${mockPath._id} not found`
    );

    expect(Path.findById).toHaveBeenCalledWith(mockPath._id);
  });

  it("should throw an error if updating the path fails", async () => {
    const errorMessage = "Error updating path";

    Path.findById = vi.fn().mockResolvedValue(mockPath._id);
    Path.findByIdAndUpdate = vi
      .fn()
      .mockRejectedValue(new ServerError(errorMessage));

    await expect(updatePath(mockPath._id, updates)).rejects.toThrow(
      errorMessage
    );

    expect(Path.findByIdAndUpdate).toHaveBeenCalledWith(mockPath._id, updates, {
      new: true
    });
  });
});
