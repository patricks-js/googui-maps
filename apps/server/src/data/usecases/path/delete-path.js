import { NotFoundError, ServerError } from '../../../http/errors.js'
import { Path } from '../../models/path.js'

export async function deletePath(id) {
  const path = await Path.findById(id)
  if (!path) {
    throw new NotFoundError(`Path with id ${id} not found`)
  }

  try {
    await Path.findByIdAndDelete(id)
  } catch (error) {
    throw new ServerError('Error deleting path')
  }
}
