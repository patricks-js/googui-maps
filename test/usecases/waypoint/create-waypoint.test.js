import { describe, expect, it, vi } from 'vitest'
import { Waypoint } from '../../../src/data/models/waypoint.js'
import { createWaypoint } from '../../../src/data/usecases/waypoint/create-waypoint.js'

vi.mock('../../../src/data/models/waypoint.js')

describe('createWaypoint', () => {
  it('should create a waypoint if it does not already exist', async () => {
    const waypoint = {
      name: 'New Waypoint',
      mapId: 'map1',
      position: { x: 10, y: 20 },
    }
    Waypoint.findOne.mockResolvedValue(null) // No existing waypoint with the same name
    Waypoint.create.mockResolvedValue(waypoint)

    const result = await createWaypoint(waypoint)

    expect(Waypoint.findOne).toHaveBeenCalledWith({ name: waypoint.name })
    expect(Waypoint.create).toHaveBeenCalledWith(waypoint)
    expect(result).toEqual(waypoint)
  })

  it('should throw an error if a waypoint with the same name already exists', async () => {
    const waypoint = {
      name: 'Existing Waypoint',
      mapId: 'map1',
      position: { x: 15, y: 25 },
    }
    Waypoint.findOne.mockResolvedValue(waypoint)

    await expect(createWaypoint(waypoint)).rejects.toThrow(
      'Waypoint already exists',
    )
  })
})
