import { BadRequestError } from "../../../http/errors.js";
import { User } from "../../models/user.js";

export async function createUser(user) {
  const userExistsWithSameEmail = await User.findOne({ email: user.email });
  const userExistsWithSameUsername = await User.findOne({
    username: user.username
  });

  if (userExistsWithSameEmail && userExistsWithSameUsername) {
    throw new BadRequestError("User already exists.");
  }

  return User.create(user);
}
