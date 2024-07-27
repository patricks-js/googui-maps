import { beforeEach, describe, expect, it, vi } from "vitest";
import { Path } from "../../../src/data/models/path.js";
import { deletePath } from "../../../src/data/usecases/path/delete-path.js";

vi.mock("../../../src/data/models/path.js");

describe("deletePath", () => {
  const mockPath = {
    _id: "123",
    distance: 100,
    start: "A",
    end: "B"
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should delete and return the path if it exists", async () => {
    Path.findByIdAndDelete = vi.fn().mockResolvedValue(mockPath);

    const result = await deletePath(mockPath._id);

    expect(Path.findByIdAndDelete).toHaveBeenCalledWith(mockPath._id);
    expect(result).toEqual(mockPath);
  });

  it("should throw an error if the path does not exist", async () => {
    Path.findByIdAndDelete = vi.fn().mockResolvedValue(null);

    await expect(deletePath(mockPath._id)).rejects.toThrow(
      "Error deleting path"
    );

    expect(Path.findByIdAndDelete).toHaveBeenCalledWith(mockPath._id);
  });

  it("should throw an error if deleting the path fails", async () => {
    const errorMessage = "Deleting error";
    Path.findByIdAndDelete = vi.fn().mockRejectedValue(new Error(errorMessage));

    await expect(deletePath(mockPath._id)).rejects.toThrow(
      "Error deleting path"
    );

    expect(Path.findByIdAndDelete).toHaveBeenCalledWith(mockPath._id);
  });
});
