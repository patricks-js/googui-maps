import { User } from "../../models/user.js";

export async function deleteUser(id) {
  try {
    const userExists = await User.findById(id);

    if (!userExists) {
      throw new Error("User not found.");
    }

    await User.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
}
