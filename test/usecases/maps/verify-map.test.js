import { afterEach, describe, expect, it, vi } from "vitest";
import { Maps } from "../../../src/data/models/map.js";
import {
  verifyIfPointExists,
  verifyMap
} from "../../../src/data/usecases/maps/verify-map.js";

vi.mock("../../../src/data/models/map.js", () => ({
  Maps: {
    findById: vi.fn()
  }
}));

describe("verifyMap", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should throw an error if the map is not found", async () => {
    const mapId = "1234";
    const startPoint = { x: 10, y: 10 };
    const destinationPoint = { x: 20, y: 20 };

    Maps.findById.mockResolvedValue(null);

    await expect(
      verifyMap(mapId, startPoint, destinationPoint)
    ).rejects.toThrow("Map not found");
  });

  it("should throw an error if the start point is not valid", async () => {
    const mapId = "1234";
    const startPoint = { x: 1000, y: 1000 }; // Out of map bounds
    const destinationPoint = { x: 20, y: 20 };
    const map = {
      dimensions: {
        width: 100,
        height: 100
      },
      obstacles: []
    };

    Maps.findById.mockResolvedValue(map);

    await expect(
      verifyMap(mapId, startPoint, destinationPoint)
    ).rejects.toThrow("Start point not found");
  });

  it("should throw an error if the destination point is not valid", async () => {
    const mapId = "1234";
    const startPoint = { x: 10, y: 10 };
    const destinationPoint = { x: 1000, y: 1000 }; // Out of map bounds
    const map = {
      dimensions: {
        width: 100,
        height: 100
      },
      obstacles: []
    };

    Maps.findById.mockResolvedValue(map);

    await expect(
      verifyMap(mapId, startPoint, destinationPoint)
    ).rejects.toThrow("Destination point not found");
  });

  it("should pass if both start and destination points are valid", async () => {
    const mapId = "1234";
    const startPoint = { x: 10, y: 10 };
    const destinationPoint = { x: 20, y: 20 };
    const map = {
      dimensions: {
        width: 100,
        height: 100
      },
      obstacles: []
    };

    Maps.findById.mockResolvedValue(map);

    await expect(
      verifyMap(mapId, startPoint, destinationPoint)
    ).resolves.toBeUndefined();
  });
});

describe("verifyIfPointExists", () => {
  it("should return true if the point is within the map dimensions and positive", () => {
    const map = {
      dimensions: {
        width: 100,
        height: 100
      },
      obstacles: []
    };

    const point = { x: 10, y: 10 };
    const result = verifyIfPointExists(map, point);

    expect(result).toBe(true);
  });

  it("should return false if the point is out of map dimensions", () => {
    const map = {
      dimensions: {
        width: 100,
        height: 100
      },
      obstacles: []
    };

    const point = { x: 200, y: 200 };
    const result = verifyIfPointExists(map, point);

    expect(result).toBe(false);
  });

  it("should return false if the point has negative coordinates", () => {
    const map = {
      dimensions: {
        width: 100,
        height: 100
      },
      obstacles: []
    };

    const point = { x: -10, y: -10 };
    const result = verifyIfPointExists(map, point);

    expect(result).toBe(false);
  });
});
