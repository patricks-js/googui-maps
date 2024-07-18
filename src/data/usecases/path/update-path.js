import { Path } from "../../../data/models/path.js";

export async function updatePath(id, updates) {
  try {
    const newPath = await Path.findByIdAndUpdate(id, updates, { new: true });
    if (!newPath) {
      throw new Error("Path not found");
    }
    return newPath;
  } catch (error) {
    throw new Error("Error updating path");
  }
}
