import { BadRequestError } from '../../../http/errors.js'
import { Path } from '../../models/path.js'

export async function createPath(path) {
  const pathExist = await Path.findOne({
    distance: path.distance,
    start: path.start,
    end: path.end,
  })

  if (pathExist) {
    throw new BadRequestError('Path overlapping.')
  }

  return Path.create(path)
}
