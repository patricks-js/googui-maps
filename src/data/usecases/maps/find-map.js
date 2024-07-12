import { Maps } from "../../models/map.js";

export async function findMapById(id) {
  console.log("id: ", id);
  try {
    return Maps.findById(id);
  } catch {
    throw new Error(`Couldn't find map with id: ${id}`);
  }
}
