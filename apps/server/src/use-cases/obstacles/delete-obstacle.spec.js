import { afterEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { NotFoundError } from '../_errors/not-found.js'
import { deleteObstacle } from './delete-obstacle.js'
import { verifyObstacleById } from './verify-obstacle-by-id.js'

vi.mock('../../db/connection.js', () => ({
  db: {
    delete: vi.fn().mockReturnThis(),
    where: vi.fn().mockResolvedValue(undefined),
  },
}))

vi.mock('./verify-obstacle-by-id.js', () => ({
  verifyObstacleById: vi.fn(),
}))

describe('Delete obstacle use case', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should successfully delete an obstacle if it exists', async () => {
    const obstacleId = '1'
    const mapId = '100'

    verifyObstacleById.mockResolvedValueOnce({
      obstacle: {
        id: obstacleId,
        mapId: mapId,
      },
    })

    await deleteObstacle(obstacleId, mapId)

    expect(verifyObstacleById).toHaveBeenCalledWith(obstacleId, mapId)
    expect(db.delete).toHaveBeenCalled()
  })

  it('should throw a NotFoundError if the obstacle does not exist', async () => {
    const obstacleId = 'non-existent'
    const mapId = '100'

    verifyObstacleById.mockRejectedValueOnce(
      new NotFoundError('Obstacle not found.'),
    )

    await expect(deleteObstacle(obstacleId, mapId)).rejects.toThrowError(
      new NotFoundError('Obstacle not found.'),
    )
    expect(verifyObstacleById).toHaveBeenCalledWith(obstacleId, mapId)
    expect(db.delete).not.toHaveBeenCalled()
  })
})
