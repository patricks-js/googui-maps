import { Waypoint } from "../../models/waypoint.js";

export async function findWaypoint(id) {
  try {
    const existingWaypoint = await Waypoint.findById(id);

    if (!existingWaypoint) {
      throw new Error("Waypoint not find");
    }

    return existingWaypoint;
  } catch (error) {
    throw new Error(error.message);
  }
}
