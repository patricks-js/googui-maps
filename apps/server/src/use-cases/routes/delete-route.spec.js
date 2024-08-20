import { afterEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { routes } from '../../db/schema/route.js'
import { deleteRoute } from './delete-route.js'
import { getBestRouteByMapId } from './get-best-route.js'

vi.mock('../../db/connection.js', () => ({
  db: {
    delete: vi.fn().mockReturnThis(),
    where: vi.fn().mockResolvedValue(undefined),
  },
}))

vi.mock('./get-best-route.js', () => ({
  getBestRouteByMapId: vi.fn(),
}))

describe('deleteRoute use case', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should successfully delete a route if it exists', async () => {
    const routeId = '1'
    const mapId = '100'

    getBestRouteByMapId.mockResolvedValueOnce({
      route: {
        id: routeId,
        mapId: mapId,
      },
    })

    await deleteRoute(routeId, mapId)

    expect(getBestRouteByMapId).toHaveBeenCalledWith(mapId)
    expect(db.delete).toHaveBeenCalledWith(routes)
  })

  it('should throw an error if the route does not exist', async () => {
    const mapId = '100'

    getBestRouteByMapId.mockRejectedValueOnce(new Error('Route not found'))

    await expect(deleteRoute('1', mapId)).rejects.toThrowError(
      'Route not found',
    )
    expect(getBestRouteByMapId).toHaveBeenCalledWith(mapId)
    expect(db.delete).not.toHaveBeenCalled() // Ensure db.delete is not called if route is not found
  })
})
