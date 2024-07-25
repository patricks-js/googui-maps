import { NotFoundError } from "../../../http/errors.js";
import { Waypoint } from "../../models/waypoint.js";

export async function findWaypoint(id) {
  const existingWaypoint = await Waypoint.findById(id);

  if (!existingWaypoint) {
    throw new NotFoundError(`Waypoint with id ${id} not found`);
  }

  return existingWaypoint;
}
