import { afterEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { NotFoundError } from '../_errors/not-found.js'
import { getMapById } from '../maps/get-map-by-id.js'
import { getBestRouteByMapId } from './get-best-route.js'

vi.mock('../../db/connection.js', () => ({
  db: {
    query: {
      routes: {
        findFirst: vi.fn(),
      },
    },
  },
}))

vi.mock('../maps/get-map-by-id.js', () => ({
  getMapById: vi.fn(),
}))

describe('getBestRouteByMapId use case', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return the route if it exists', async () => {
    const mapId = '100'
    const route = {
      id: '1',
      mapId: mapId,
      name: 'Best Route',
    }

    getMapById.mockResolvedValueOnce({ map: { id: mapId } })
    db.query.routes.findFirst.mockResolvedValueOnce(route)

    const result = await getBestRouteByMapId(mapId)

    expect(getMapById).toHaveBeenCalledWith(mapId)

    expect(result.route).toEqual(route)
  })

  it('should throw a NotFoundError if no route is found', async () => {
    const mapId = '100'

    getMapById.mockResolvedValueOnce({ map: { id: mapId } })
    db.query.routes.findFirst.mockResolvedValueOnce(null)

    await expect(getBestRouteByMapId(mapId)).rejects.toThrowError(
      new NotFoundError('Route not found.'),
    )
    expect(getMapById).toHaveBeenCalledWith(mapId)
  })
})
