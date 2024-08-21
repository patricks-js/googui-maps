import { afterEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { updateWaypoint } from './update-waypoint.js'
import { verifyWaypointById } from './verify-waypoint-by-id.js'

vi.mock('../../db/connection.js', () => ({
  db: {
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    returning: vi.fn().mockReturnThis(),
  },
}))

vi.mock('./verify-waypoint-by-id.js', () => ({
  verifyWaypointById: vi.fn(),
}))

describe('Update waypoint use case', () => {
  const waypointId = 1
  const mockWaypoint = {
    id: 1,
    position: { x: 0, y: 0 },
    name: 'Old Waypoint',
    mapId: '100',
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should update the waypoint position and name', async () => {
    const changes = {
      mapId: 100,
      position: { x: 10, y: 20 },
      name: 'Updated Waypoint',
    }

    const updatedWaypointMock = {
      id: 1,
      position: { x: 10, y: 20 },
      name: 'Updated Waypoint',
    }

    verifyWaypointById.mockResolvedValueOnce(mockWaypoint)
    db.returning.mockResolvedValueOnce([updatedWaypointMock])

    const result = await updateWaypoint(waypointId, changes)

    expect(verifyWaypointById).toHaveBeenCalledWith(waypointId, changes.mapId)
    expect(db.update).toHaveBeenCalled()
    expect(db.set).toHaveBeenCalledWith(
      expect.objectContaining(updatedWaypointMock),
    )
    expect(result.updatedWaypoint).toEqual(updatedWaypointMock)
  })

  it('should update only the waypoint name if position is not provided', async () => {
    const changes = {
      mapId: 100,
      name: 'Updated Waypoint',
    }

    const updatedWaypointMock = {
      id: 1,
      position: { x: 0, y: 0 },
      name: 'Updated Waypoint',
    }

    verifyWaypointById.mockResolvedValueOnce(mockWaypoint)
    db.returning.mockResolvedValueOnce([updatedWaypointMock])

    const result = await updateWaypoint(waypointId, changes)

    expect(verifyWaypointById).toHaveBeenCalledWith(waypointId, changes.mapId)
    expect(db.update).toHaveBeenCalled()
    expect(result.updatedWaypoint).toEqual(updatedWaypointMock)
  })

  it('should update only the waypoint position if name is not provided', async () => {
    const changes = {
      mapId: '100',
      position: { x: 10, y: 20 },
    }

    const updatedWaypointMock = {
      id: '1',
      position: { x: 10, y: 20 },
      name: 'Old Waypoint',
    }

    verifyWaypointById.mockResolvedValueOnce(mockWaypoint)
    db.returning.mockResolvedValueOnce([updatedWaypointMock])

    const result = await updateWaypoint(waypointId, changes)

    expect(verifyWaypointById).toHaveBeenCalledWith(waypointId, changes.mapId)
    expect(db.update).toHaveBeenCalled()
    expect(result.updatedWaypoint).toEqual(updatedWaypointMock)
  })

  it('should throw an error if waypoint does not exist', async () => {
    const waypointId = 'non-existent'
    const changes = {
      mapId: 100,
    }

    verifyWaypointById.mockRejectedValueOnce(new Error('Waypoint not found'))

    await expect(updateWaypoint(waypointId, changes)).rejects.toThrowError(
      'Waypoint not found',
    )
    expect(verifyWaypointById).toHaveBeenCalledWith(waypointId, changes.mapId)
  })
})
