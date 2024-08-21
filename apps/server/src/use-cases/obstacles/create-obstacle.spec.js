import { afterEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { getMapById } from '../maps/get-map-by-id.js'
import { createObstacle } from './create-obstacle.js'

vi.mock('../../db/connection.js', () => ({
  db: {
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    returning: vi.fn().mockResolvedValue([]),
  },
}))

vi.mock('../maps/get-map-by-id.js', () => ({
  getMapById: vi.fn(),
}))

describe('Create obstacle use case', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should create a new obstacle and return it', async () => {
    const obstacle = {
      id: '1',
      mapId: '100',
      position: { x: 10, y: 20 },
      size: { width: 30, height: 40 },
    }

    const newObstacle = { ...obstacle, id: '1' }

    getMapById.mockResolvedValueOnce({ mapId: obstacle.mapId })
    db.returning.mockResolvedValueOnce([newObstacle])

    const result = await createObstacle(obstacle)

    expect(getMapById).toHaveBeenCalledWith(obstacle.mapId)
    expect(db.insert).toHaveBeenCalled()
    expect(db.values).toHaveBeenCalledWith({
      ...obstacle,
      mapId: obstacle.mapId,
    })
    expect(result.newObstacle).toEqual(newObstacle)
  })

  it('should throw an error if the map does not exist', async () => {
    const obstacle = {
      id: '1',
      mapId: 'non-existent',
    }

    getMapById.mockRejectedValueOnce(new Error('Map not found'))

    await expect(createObstacle(obstacle)).rejects.toThrowError('Map not found')
    expect(getMapById).toHaveBeenCalledWith(obstacle.mapId)
    expect(db.insert).not.toHaveBeenCalled()
  })
})
