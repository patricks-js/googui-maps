import { Path } from "../../../data/models/path.js";

export async function findPath(id) {
  try {
    const path = await Path.findById(id);

    if (!path) {
      throw new Error("Path not found");
    }

    return path;
  } catch (error) {
    throw new Error("Error finding path");
  }
}
