import { NotFoundError } from '../../../http/errors.js'
import { Maps } from '../../models/map.js'

export async function findMapById(id) {
  const map = await Maps.findById(id)

  if (!map) {
    throw new NotFoundError(`Map with id ${id} not found`)
  }

  return map
}
