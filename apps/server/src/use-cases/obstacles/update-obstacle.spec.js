import { afterEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { updateObstacle } from './update-obstacle.js'
import { verifyObstacleById } from './verify-obstacle-by-id.js'

vi.mock('../../db/connection.js', () => ({
  db: {
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    returning: vi.fn().mockResolvedValue([]),
  },
}))

vi.mock('./verify-obstacle-by-id.js', () => ({
  verifyObstacleById: vi.fn(),
}))

describe('Update obstacle use case', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should update all fields of the obstacle', async () => {
    const obstacleId = '1'
    const changes = {
      mapId: '100',
      position: { x: 15, y: 25 },
      size: { width: 30, height: 40 },
    }

    const mockObstacle = {
      id: obstacleId,
      mapId: '100',
      position: { x: 10, y: 20 },
      size: { width: 20, height: 30 },
    }

    const updatedObstacle = {
      id: obstacleId,
      position: { x: 15, y: 25 },
      size: { width: 30, height: 40 },
    }

    verifyObstacleById.mockResolvedValueOnce({ obstacle: mockObstacle })
    db.returning.mockResolvedValueOnce([updatedObstacle])

    const result = await updateObstacle(obstacleId, changes)

    expect(verifyObstacleById).toHaveBeenCalledWith(obstacleId, changes.mapId)
    expect(db.update).toHaveBeenCalled()
    expect(db.set).toHaveBeenCalledWith(
      expect.objectContaining(updatedObstacle),
    )
    expect(result.updatedObstacle).toEqual(updatedObstacle)
  })

  it('should update only the specified fields', async () => {
    const obstacleId = '1'
    const changes = {
      position: { x: 15, y: 25 },
    }

    const mockObstacle = {
      id: obstacleId,
      mapId: '100',
      position: { x: 10, y: 20 },
      size: { width: 20, height: 30 },
    }

    const updatedObstacle = {
      id: obstacleId,
      position: { x: 15, y: 25 },
      size: { width: 20, height: 30 },
    }

    verifyObstacleById.mockResolvedValueOnce({ obstacle: mockObstacle })
    db.returning.mockResolvedValueOnce([updatedObstacle])

    const result = await updateObstacle(obstacleId, changes)

    expect(db.update).toHaveBeenCalled()
    expect(db.set).toHaveBeenCalledWith(
      expect.objectContaining(updatedObstacle),
    )
    expect(result.updatedObstacle).toEqual(updatedObstacle)
  })

  it('should throw an error if obstacle does not exist', async () => {
    const obstacleId = 'non-existent'
    const changes = {
      position: { x: 15, y: 25 },
    }

    verifyObstacleById.mockRejectedValueOnce(new Error('Obstacle not found'))

    await expect(updateObstacle(obstacleId, changes)).rejects.toThrowError(
      'Obstacle not found',
    )
    expect(verifyObstacleById).toHaveBeenCalledWith(obstacleId, changes.mapId)
    expect(db.update).not.toHaveBeenCalled()
  })
})
