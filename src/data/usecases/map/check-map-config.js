import { BadRequestError } from "../../../http/errors.js";
import { Obstacle } from "../../models/obstacle.js";
import { Waypoint } from "../../models/waypoint.js";

export async function checkMapConfiguration(mapId) {
  const obstacles = await Obstacle.find({ mapId });
  const waypoints = await Waypoint.find({ mapId });

  if (!obstacles.length || !waypoints.length) {
    throw new BadRequestError(
      "Map is not configured with obstacles or waypoints"
    );
  }

  return {
    message: "The map is set up correctly with obstacles and stopping points."
  };
}
