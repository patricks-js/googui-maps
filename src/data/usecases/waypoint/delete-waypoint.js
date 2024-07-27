import { Waypoint } from "../../models/waypoint.js";

export async function deleteWaypoint(id) {
  try {
    const result = await Waypoint.findByIdAndDelete(id);

    if (!result) {
      throw new Error("Waypoint not found");
    }

    return result;
  } catch (error) {
    throw new Error(`Error at deleting Waypoint: ${error.message}`);
  }
}
