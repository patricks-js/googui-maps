import { beforeEach, describe, expect, it, vi } from "vitest";
import { Path } from "../../../src/data/models/path.js";
import { createPath } from "../../../src/data/usecases/path/create-path.js";

vi.mock("../../../src/data/models/path.js");

describe("createPath", () => {
  const mockPath = {
    distance: 100,
    start: "A",
    end: "B"
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a new path if no overlapping path exists", async () => {
    Path.findOne.mockResolvedValue(null);
    Path.create.mockResolvedValue(mockPath);

    const result = await createPath(mockPath);

    expect(Path.findOne).toHaveBeenCalledWith({
      distance: mockPath.distance,
      start: mockPath.start,
      end: mockPath.end
    });
    expect(Path.create).toHaveBeenCalledWith(mockPath);
    expect(result).toEqual(mockPath);
  });

  it("should throw an error if an overlapping path exists", async () => {
    Path.findOne.mockResolvedValue(mockPath);

    await expect(createPath(mockPath)).rejects.toThrow(
      "Error creating new path."
    );

    expect(Path.findOne).toHaveBeenCalledWith({
      distance: mockPath.distance,
      start: mockPath.start,
      end: mockPath.end
    });
    expect(Path.create).not.toHaveBeenCalled();
  });

  it("should throw an error if creation fails", async () => {
    const errorMessage = "Error creating new path.";
    Path.findOne.mockResolvedValue(null);
    Path.create.mockRejectedValue(new Error(errorMessage));

    await expect(createPath(mockPath)).rejects.toThrow(errorMessage);

    expect(Path.findOne).toHaveBeenCalledWith({
      distance: mockPath.distance,
      start: mockPath.start,
      end: mockPath.end
    });
    expect(Path.create).toHaveBeenCalledWith(mockPath);
  });
});
