import { Obstacle } from "../../models/obstacle.js";

export async function deleteObstacle(id) {
  try {
    return Obstacle.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Error deleting obstacle with id: ${id}`);
  }
}
