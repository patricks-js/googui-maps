import { NotFoundError, ServerError } from '../../../http/errors.js'
import { User } from '../../models/user.js'

export async function updateUser(id, changes) {
  const userExists = await User.findById(id)

  if (!userExists) {
    throw new NotFoundError(`User with id ${id} not found`)
  }

  try {
    return User.findByIdAndUpdate(id, changes, { new: true })
  } catch (error) {
    throw new ServerError('Error updating user')
  }
}
