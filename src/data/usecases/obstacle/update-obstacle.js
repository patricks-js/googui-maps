import { Obstacle } from "../../models/obstacle.js";

export async function updateObstacle(id, newObstacle) {
  try {
    return await Obstacle.findByIdAndUpdate(id, newObstacle, { new: true });
  } catch (error) {
    throw new Error("Error updating obstacle");
  }
}
