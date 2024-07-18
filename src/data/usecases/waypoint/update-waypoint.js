import { Waypoint } from "../../models/waypoint.js";

export async function updateWaypoint(id, newWaypoint) {
  try {
    return Waypoint.findByIdAndUpdate(id, newWaypoint, { new: true });
  } catch (error) {
    throw new Error("Error updating waypoint");
  }
}
