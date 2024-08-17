import { NotFoundError } from '../../../http/errors.js'
import { User } from '../../models/user.js'

export async function findUser(id) {
  const userExists = await User.findById(id)

  if (!userExists) {
    throw new NotFoundError(`User with id ${id} not found`)
  }

  return userExists
}
