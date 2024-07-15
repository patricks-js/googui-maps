import { User } from "../../models/user.js";

export async function updateUser(id, changes) {
  try {
    const userExists = await User.findById(id);

    if (!userExists) {
      throw new Error("User not found.");
    }

    return User.findByIdAndUpdate(id, changes, { new: true });
  } catch (error) {
    throw new Error(error.message);
  }
}
