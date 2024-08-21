import { afterEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { getAllObstacles } from './get-all-obstacles.js'

vi.mock('../../db/connection.js', () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockResolvedValue([]),
  },
}))

describe('Get all obstacles use case', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return a list of obstacles', async () => {
    const mapId = '100'
    const expectedObstacles = [
      {
        id: '1',
        mapId,
        position: { x: 10, y: 20 },
        size: { width: 30, height: 40 },
      },
      {
        id: '2',
        mapId,
        position: { x: 15, y: 25 },
        size: { width: 35, height: 45 },
      },
    ]

    db.where.mockResolvedValueOnce(expectedObstacles)

    const result = await getAllObstacles(mapId)

    expect(db.select).toHaveBeenCalled()
    expect(result.obstacles).toEqual(expectedObstacles)
  })

  it('should return an empty list if no obstacles are found', async () => {
    const mapId = '100'

    db.where.mockResolvedValueOnce([])

    const result = await getAllObstacles(mapId)

    expect(db.where).toHaveBeenCalled()
    expect(result.obstacles).toEqual([])
  })
})
