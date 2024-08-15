import { NotFoundError, ServerError } from '../../../http/errors.js'
import { Path } from '../../models/path.js'

export async function updatePath(id, updates) {
  const path = await Path.findById(id)
  if (!path) {
    throw new NotFoundError(`Path with id ${id} not found`)
  }

  try {
    return Path.findByIdAndUpdate(id, updates, { new: true })
  } catch (error) {
    throw new ServerError('Error updating path')
  }
}
