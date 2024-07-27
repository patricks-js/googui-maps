import { Path } from "../../models/path.js";

export async function deletePath(id) {
  try {
    const path = await Path.findByIdAndDelete(id);
    if (!path) {
      throw new Error("Path not found");
    }
    return path;
  } catch (error) {
    throw new Error("Error deleting path");
  }
}
