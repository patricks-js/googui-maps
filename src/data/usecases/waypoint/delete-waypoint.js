import { Waypoint } from "../../models/waypoint.js";

export async function deleteWaypoint(id) {
  try {
    return Waypoint.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error at deleting Waypoint");
  }
}
