import { NotFoundError, ServerError } from "../../../http/errors.js";
import { Maps } from "../../models/map.js";

export async function deleteMap(id) {
  const map = await Maps.findById(id);
  if (!map) {
    throw new NotFoundError(`Map with id ${id} not found`);
  }

  try {
    await Maps.findByIdAndDelete(id);
  } catch (error) {
    throw new ServerError("Error deleting map");
  }
}
