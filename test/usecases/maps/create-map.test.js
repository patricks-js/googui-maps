import { describe, expect, it, vi } from "vitest";
import { createMap } from "../../../src/data/usecases/map/create-map.js";

import { Maps } from "../../../src/data/models/map.js";

vi.mock("../../../src/data/models/map.js", () => ({
  Maps: {
    findOne: vi.fn(),
    create: vi.fn()
  }
}));

describe("createMap", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create a new map when it does not already exist", async () => {
    const map = {
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

    Maps.findOne.mockResolvedValue(null);
    Maps.create.mockResolvedValue({ id: "1", ...map });

    const result = await createMap(map);

    expect(Maps.findOne).toHaveBeenCalledWith({ name: map.name });
    expect(Maps.create).toHaveBeenCalledWith(map);
    expect(result).toEqual({ id: "1", ...map });
  });

  it("should throw an error when the map already exists", async () => {
    const map = {
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

    Maps.findOne.mockResolvedValue({ id: "1", ...map });

    await expect(createMap(map)).rejects.toThrow("Map already exists");

    expect(Maps.findOne).toHaveBeenCalledWith({ name: map.name });
    expect(Maps.create).not.toHaveBeenCalled();
  });
});
