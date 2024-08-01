import { NotFoundError, ServerError } from "../../../http/errors.js";
import { Waypoint } from "../../models/waypoint.js";

export async function updateWaypoint(id, newWaypoint) {
  const waypoint = await Waypoint.findById(id);

  if (!waypoint) {
    throw new NotFoundError(`Waypoint with id ${id} not found`);
  }

  try {
    return Waypoint.findByIdAndUpdate(id, newWaypoint, { new: true });
  } catch (error) {
    throw new ServerError("Error updating waypoint");
  }
}
