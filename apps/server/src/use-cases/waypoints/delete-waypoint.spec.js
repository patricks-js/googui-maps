import { afterEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { NotFoundError } from '../_errors/not-found.js'
import { deleteWaypoint } from './delete-waypoint.js'
import { verifyWaypointById } from './verify-waypoint-by-id.js'

vi.mock('../../db/connection.js', () => ({
  db: {
    delete: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
  },
}))

vi.mock('./verify-waypoint-by-id.js', () => ({
  verifyWaypointById: vi.fn(),
}))

describe('Delete waypoint use case', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should delete the waypoint if it exists', async () => {
    const waypointId = '1'
    const mapId = 100

    verifyWaypointById.mockResolvedValueOnce({
      id: waypointId,
      mapId: mapId,
    })

    await deleteWaypoint(waypointId, mapId)

    expect(verifyWaypointById).toHaveBeenCalledWith(waypointId, mapId)
    expect(db.delete).toHaveBeenCalled()
  })

  it('should throw an error if the waypoint does not exist', async () => {
    const waypointId = 'non-existent'
    const mapId = 100

    verifyWaypointById.mockRejectedValueOnce(
      new NotFoundError('Waypoint not found'),
    )

    await expect(deleteWaypoint(waypointId, mapId)).rejects.toThrowError(
      'Waypoint not found',
    )
    expect(verifyWaypointById).toHaveBeenCalledWith(waypointId, mapId)
    expect(db.delete).not.toHaveBeenCalled()
  })
})
