import { afterEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { getMapById } from '../maps/get-map-by-id.js'
import { verifyWaypointById } from './verify-waypoint-by-id.js'

vi.mock('../maps/get-map-by-id.js', () => ({
  getMapById: vi.fn(),
}))

vi.mock('../../db/connection.js', () => ({
  db: {
    query: {
      waypoints: {
        findFirst: vi.fn(),
      },
    },
  },
}))

describe('Verify waypoint by ID use case', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return waypoint when it exists', async () => {
    const waypointId = 1
    const mapId = 100
    const mockWaypoint = {
      id: waypointId,
      mapId: mapId,
      name: 'Sample Waypoint',
    }

    getMapById.mockResolvedValueOnce({ map: { id: mapId } })

    db.query.waypoints.findFirst.mockResolvedValueOnce(mockWaypoint)

    const result = await verifyWaypointById(waypointId, mapId)

    expect(getMapById).toHaveBeenCalledWith(mapId)
    expect(db.query.waypoints.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.any(Function),
      }),
    )
    expect(result.waypoint).toEqual(mockWaypoint)
  })

  it('should throw NotFoundError if waypoint does not exist', async () => {
    const waypointId = 1
    const mapId = 100

    getMapById.mockResolvedValueOnce({ map: { id: mapId } })

    db.query.waypoints.findFirst.mockResolvedValueOnce(null)

    await expect(verifyWaypointById(waypointId, mapId)).rejects.toThrowError(
      'Waypoint not found.',
    )

    expect(getMapById).toHaveBeenCalledWith(mapId)
    expect(db.query.waypoints.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.any(Function),
      }),
    )
  })
})
