import { afterEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { getAllWaypoints } from './get-all-waypoints.js'

vi.mock('../../db/connection.js', () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
  },
}))

describe('Get all waypoints use case', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return all waypoints for a given mapId', async () => {
    const mapId = '100'
    const mockWaypoints = [
      { id: '1', mapId: '100', name: 'Waypoint 1' },
      { id: '2', mapId: '100', name: 'Waypoint 2' },
    ]

    db.where.mockResolvedValueOnce(mockWaypoints)

    const result = await getAllWaypoints(mapId)

    expect(db.select).toHaveBeenCalled()
    expect(db.from).toHaveBeenCalledWith(expect.anything())
    expect(result.waypoints).toEqual(mockWaypoints)
  })

  it('should return an empty array if no waypoints are found', async () => {
    const mapId = '101'

    db.where.mockResolvedValueOnce([])

    const result = await getAllWaypoints(mapId)

    expect(db.select).toHaveBeenCalled()
    expect(db.from).toHaveBeenCalledWith(expect.anything())
    expect(result.waypoints).toEqual([])
  })
})
