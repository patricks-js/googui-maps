import { Maps } from "../../models/map.js";

export async function findMapById(id) {
  try {
    return await Maps.findById(id);
  } catch (error) {
    throw new Error(`Couldn't find map with id: ${id}`);
  }
}
