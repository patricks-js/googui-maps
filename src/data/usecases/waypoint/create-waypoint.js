import { Waypoint } from "../../models/waypoint.js";

export async function createWaypoint(waypoint) {
  const existingWaypoint = await Waypoint.findOne({ name: waypoint.name });

  if (!existingWaypoint) {
    return Waypoint.create(waypoint);
  }

  throw new Error("Waypoint already exists");
}
