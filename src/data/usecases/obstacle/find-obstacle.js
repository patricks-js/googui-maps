import { Obstacle } from "../../models/obstacle.js";

export async function findObstacle(id) {
  try {
    return await Obstacle.findById(id);
  } catch (error) {
    throw new Error("Error fetching obstacles: ", error);
  }
}
