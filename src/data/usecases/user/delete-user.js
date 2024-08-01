import { NotFoundError, ServerError } from "../../../http/errors.js";
import { User } from "../../models/user.js";

export async function deleteUser(id) {
  const userExists = await User.findById(id);

  if (!userExists) {
    throw new NotFoundError(`User with id ${id} not found`);
  }

  try {
    await User.findByIdAndDelete(id);
  } catch (error) {
    throw new ServerError(error.message);
  }
}
