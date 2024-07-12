import { Maps } from "../../models/map.js";

export async function findMapById(id) {
  console.log("id: ", id);
  try {
    const map = await Maps.findById(id);

    return map;
  } catch {
    throw new Error(`Couldn't find map with id: ${id}`);
  }
}
