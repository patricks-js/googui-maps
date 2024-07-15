import { User } from "../../models/user.js";

export async function createUser(user) {
  try {
    const userExistsWithSameEmail = await User.findOne({ email: user.email });
    const userExistsWithSameUsername = await User.findOne({
      username: user.username
    });

    if (userExistsWithSameEmail && userExistsWithSameUsername) {
      throw new Error("User already exists.");
    }

    return User.create(user);
  } catch (err) {
    throw new Error("Error creating user.");
  }
}
