import { Maps } from "../../models/map.js";

export async function updateMap(id, newMap) {
  try {
    return Maps.findByIdAndUpdate(id, newMap, { new: true });
  } catch (error) {
    throw new Error("Error update map");
  }
}
