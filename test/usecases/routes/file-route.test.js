import { beforeEach, describe, expect, it, vi } from "vitest";
import { Maps } from "../../../src/data/models/map.js";
import { verifyIfPointExists } from "../../../src/data/usecases/map/verify-map.js";
import { findBestRouteFromJSON } from "../../../src/data/usecases/route/find-route.js";

vi.mock("../../../src/data/models/map.js");
vi.mock("../../../src/data/usecases/map/verify-map.js");

describe("findBestRouteFromJSON", () => {
  const mockMap = {
    id: "map1",
    points: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 }
    ],
    obstacles: [{ x: 0, y: 1 }]
  };

  const mockInputJSON = {
    mapId: "map1",
    start_point: { x: 0, y: 0 },
    end_point: { x: 1, y: 1 },
    stop_points: [] // Adicionando pontos de parada como lista vazia
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should find the best route given a valid map and points", async () => {
    Maps.findById.mockResolvedValue(mockMap);
    verifyIfPointExists.mockImplementation((map, point) =>
      map.points.some((p) => p.x === point.x && p.y === point.y)
    );

    const result = await findBestRouteFromJSON(mockInputJSON);

    expect(Maps.findById).toHaveBeenCalledWith(mockInputJSON.mapId);
    console.log(result.optimal_path);

    expect(result.optimal_path).toEqual([
      { x: 1, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 1 }
    ]);
  });

  it("should throw an error if the map is invalid", async () => {
    Maps.findById.mockResolvedValue(null);

    await expect(findBestRouteFromJSON(mockInputJSON)).rejects.toThrow(
      "Invalid map or points."
    );

    expect(Maps.findById).toHaveBeenCalledWith(mockInputJSON.mapId);
  });

  it("should throw an error if the start point does not exist on the map", async () => {
    Maps.findById.mockResolvedValue(mockMap);
    verifyIfPointExists.mockImplementation((map, point) =>
      map.points.some((p) => p.x === point.x && p.y === point.y)
    );
    verifyIfPointExists.mockReturnValueOnce(false);

    await expect(findBestRouteFromJSON(mockInputJSON)).rejects.toThrow(
      "Invalid map or points."
    );

    expect(Maps.findById).toHaveBeenCalledWith(mockInputJSON.mapId);
  });

  it("should throw an error if the end point does not exist on the map", async () => {
    Maps.findById.mockResolvedValue(mockMap);
    verifyIfPointExists.mockImplementation((map, point) =>
      map.points.some((p) => p.x === point.x && p.y === point.y)
    );
    verifyIfPointExists.mockReturnValueOnce(true).mockReturnValueOnce(false);

    await expect(findBestRouteFromJSON(mockInputJSON)).rejects.toThrow(
      "Invalid map or points."
    );

    expect(Maps.findById).toHaveBeenCalledWith(mockInputJSON.mapId);
  });

  it("should throw an error if no path is found", async () => {
    // Adicionando obstáculos para bloquear todos os caminhos possíveis
    const blockedMap = {
      ...mockMap,
      obstacles: [...mockMap.obstacles, { x: 1, y: 0 }, { x: 1, y: 1 }]
    };
    Maps.findById.mockResolvedValue(blockedMap);
    verifyIfPointExists.mockImplementation((map, point) =>
      map.points.some((p) => p.x === point.x && p.y === point.y)
    );

    await expect(findBestRouteFromJSON(mockInputJSON)).rejects.toThrow(
      "No path found"
    );

    expect(Maps.findById).toHaveBeenCalledWith(mockInputJSON.mapId);
  });
});
