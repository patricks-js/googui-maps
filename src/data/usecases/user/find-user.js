import { User } from "../../models/user.js";

export async function findUser(id) {
  try {
    const userExists = await User.findById(id);

    if (!userExists) {
      throw new Error("User not found.");
    }

    return userExists;
  } catch (error) {
    throw new Error(error.message);
  }
}
