import { ServerError } from "../../../http/errors.js";
import { Maps } from "../../models/map.js";

export async function updateMap(id, newMap) {
  const map = await Maps.findById(id);
  if (!map) {
    throw new NotFoundError(`Map with id ${id} not found`);
  }

  try {
    return await Maps.findByIdAndUpdate(id, newMap, { new: true });
  } catch (error) {
    throw new ServerError("Error updating map");
  }
}
