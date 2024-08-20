import { afterEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { NotFoundError } from '../_errors/not-found.js'
import { getMapById } from '../maps/get-map-by-id.js'
import { verifyObstacleById } from './verify-obstacle-by-id.js'

vi.mock('../../db/connection.js', () => ({
  db: {
    query: {
      obstacles: {
        findFirst: vi.fn(),
      },
    },
  },
}))

vi.mock('../maps/get-map-by-id.js', () => ({
  getMapById: vi.fn(),
}))

describe('Verify obstacle by id use case', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return the obstacle if it exists', async () => {
    const obstacleId = '1'
    const mapId = '100'
    const obstacle = {
      id: obstacleId,
      mapId: mapId,
      position: { x: 10, y: 20 },
      size: { width: 30, height: 40 },
    }

    getMapById.mockResolvedValueOnce({ mapId })
    db.query.obstacles.findFirst.mockResolvedValueOnce(obstacle)

    const result = await verifyObstacleById(obstacleId, mapId)

    expect(getMapById).toHaveBeenCalledWith(mapId)
    expect(result.obstacle).toEqual(obstacle)
  })

  it('should throw an error if the obstacle does not exist', async () => {
    const obstacleId = 'non-existent'
    const mapId = '100'

    getMapById.mockResolvedValueOnce({ mapId })
    db.query.obstacles.findFirst.mockResolvedValueOnce(null)

    await expect(verifyObstacleById(obstacleId, mapId)).rejects.toThrowError(
      new NotFoundError('Obstacle not found.'),
    )
    expect(getMapById).toHaveBeenCalledWith(mapId)
  })

  it('should throw an error if the map does not exist', async () => {
    const obstacleId = '1'
    const mapId = 'non-existent'

    getMapById.mockRejectedValueOnce(new Error('Map not found'))

    await expect(verifyObstacleById(obstacleId, mapId)).rejects.toThrowError(
      'Map not found',
    )
    expect(getMapById).toHaveBeenCalledWith(mapId)
    expect(db.query.obstacles.findFirst).not.toHaveBeenCalled()
  })
})
