import { NotFoundError, ServerError } from "../../../http/errors.js";
import { Obstacle } from "../../models/obstacle.js";

export async function deleteObstacle(id) {
  const obstacleExists = await Obstacle.findById(id);

  if (!obstacleExists) {
    throw new NotFoundError(`Obstacle with id ${id} not found`);
  }

  try {
    return await Obstacle.findByIdAndDelete(id);
  } catch (error) {
    throw new ServerError("Error deleting obstacle");
  }
}
