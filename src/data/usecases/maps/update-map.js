import { Maps } from "../../models/map.js";

export async function updateMap(id, newMap) {
  try {
    const updatedMap = await Maps.findByIdAndUpdate(id, newMap, { new: true });
    return updatedMap;
  } catch (error) {
    throw new Error("Error updat map");
  }
}
