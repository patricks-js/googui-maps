import { Maps } from "../../models/map.js";

export async function deleteMap(id) {
  try {
    await Maps.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error deleting map: ", error);
  }
}
