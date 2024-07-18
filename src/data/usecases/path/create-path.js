import { Path } from "../../models/path.js";

export async function createPath(path) {
  try {
    const pathExist = await Path.findOne({
      distance: path.distance,
      start: path.start,
      end: path.end
    });

    if (pathExist) {
      throw new Error("Path overlapping.");
    }

    return Path.create(path);
  } catch (error) {
    throw new Error("Error creating new path.");
  }
}
