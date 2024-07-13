import { Maps } from "../../models/map.js";
import { Obstacle } from "../../models/obstacle.js";

export async function createObstacle(obstacle) {
  try {
    const mapExists = await Maps.findById(obstacle.mapId);

    if (!mapExists) {
      throw new Error("Map not found");
    }

    return Obstacle.create(obstacle);
  } catch (err) {
    throw new Error("Error creating obstacle");
  }
}
