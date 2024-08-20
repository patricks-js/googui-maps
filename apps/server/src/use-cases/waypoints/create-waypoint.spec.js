import { afterEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { getMapById } from '../maps/get-map-by-id.js'
import { createWaypoint } from './create-waypoint.js'

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

describe('createWaypoint use case', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should create a new waypoint and return it', async () => {
    const waypoint = {
      id: '1',
      mapId: '100',
      position: { x: 10, y: 20 },
      name: 'New Waypoint',
    }

    const newWaypoint = {
      id: '1',
      position: { x: 10, y: 20 },
      name: 'New Waypoint',
    }

    getMapById.mockResolvedValueOnce({ mapId: waypoint.mapId })
    db.returning.mockResolvedValueOnce([newWaypoint])

    const result = await createWaypoint(waypoint)

    expect(getMapById).toHaveBeenCalledWith(waypoint.mapId)
    expect(db.insert).toHaveBeenCalled()
    expect(db.values).toHaveBeenCalledWith({
      ...waypoint,
      mapId: waypoint.mapId,
    })
    expect(result.newWaypoint).toEqual(newWaypoint)
  })

  it('should throw an error if map does not exist', async () => {
    const waypoint = {
      id: '1',
      mapId: 'non-existent',
      position: { x: 10, y: 20 },
      name: 'New Waypoint',
    }

    getMapById.mockRejectedValueOnce(new Error('Map not found'))

    await expect(createWaypoint(waypoint)).rejects.toThrowError('Map not found')
    expect(getMapById).toHaveBeenCalledWith(waypoint.mapId)
    expect(db.insert).not.toHaveBeenCalled()
  })
})
