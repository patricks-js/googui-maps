import { Obstacle } from "../../models/obstacle.js";
import { Waypoint } from "../../models/waypoint.js";

export async function checkMapConfiguration(mapId) {
  const obstacles = await Obstacle.find({ mapId });
  const waypoints = await Waypoint.find({ mapId });

  if (!obstacles.length || !waypoints.length) {
    throw new Error("Map is not configured with obstacles or waypoints");
  }

  return {
    message:
      "O mapa foi configurado corretamente com obstáculos e pontos de parada."
  };
}
