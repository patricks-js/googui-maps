import { Path } from "../../../data/models/path.js";
import { ServerError } from "../../../http/errors.js";

export async function findPath(id) {
  const path = await Path.findById(id);
  if (!path) {
    throw new ServerError("Path not found");
  }

  return path;
}
