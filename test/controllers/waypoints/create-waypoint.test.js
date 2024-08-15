import { beforeEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { createWaypoint } from '../../../src/data/usecases/waypoint/create-waypoint.js'
import { createWaypointController } from '../../../src/http/controllers/waypoint/create-waypoint.js'

vi.mock('../../../src/data/usecases/waypoint/create-waypoint.js', () => ({
  createWaypoint: vi.fn(),
}))

describe('createWaypointController', () => {
  let request
  let reply

  beforeEach(() => {
    request = {
      body: {
        mapId: 'map123',
        position: { x: 10, y: 20 },
        name: 'Waypoint 1',
      },
    }

    reply = {
      status: vi.fn(() => reply),
      send: vi.fn(),
    }
  })

  it('should create a waypoint successfully', async () => {
    createWaypoint.mockResolvedValue(request.body)

    await createWaypointController(request, reply)

    expect(createWaypoint).toHaveBeenCalledWith(request.body)
  })

  it('should handle validation errors', async () => {
    request.body = {
      mapId: 'map123',
      position: { x: 10, y: 'invalid' },
      name: 'Waypoint 1',
    } // Invalid body

    try {
      await createWaypointController(request, reply)
    } catch (e) {
      expect(e).toBeInstanceOf(z.ZodError)
      expect(e.errors).toHaveLength(1)
    }
  })

  it('should handle errors from createWaypoint', async () => {
    createWaypoint.mockRejectedValue(new Error('Create Waypoint Error'))

    try {
      await createWaypointController(request, reply)
    } catch (e) {
      expect(e.message).toBe('Create Waypoint Error')
    }

    expect(createWaypoint).toHaveBeenCalledWith(request.body)
  })
})
