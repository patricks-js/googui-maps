import { beforeEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { updateWaypoint } from '../../../src/data/usecases/waypoint/update-waypoint.js'
import { updateWaypointController } from '../../../src/http/controllers/waypoint/update-waypoint.js'
import { validators } from '../../../src/http/validators.js'

vi.mock('../../../src/data/usecases/waypoint/update-waypoint.js', () => ({
  updateWaypoint: vi.fn(),
}))

vi.mock('../../../src/http/validators.js', () => ({
  validators: {
    idParamSchema: vi.fn(),
  },
}))

describe('updateWaypointController', () => {
  let request
  let reply

  beforeEach(() => {
    request = {
      params: { id: '123' },
      body: {
        mapId: 'map1',
        position: { x: 10, y: 20 },
        name: 'Waypoint 1',
      },
    }

    reply = {
      send: vi.fn(),
    }

    validators.idParamSchema.mockImplementation((params) => ({
      id: params.id,
    }))
    updateWaypoint.mockResolvedValue({ success: true })
  })

  it('should update waypoint successfully', async () => {
    await updateWaypointController(request, reply)
    expect(validators.idParamSchema).toHaveBeenCalledWith(request.params)
    expect(updateWaypoint).toHaveBeenCalledWith('123', {
      mapId: 'map1',
      position: { x: 10, y: 20 },
      name: 'Waypoint 1',
    })
  })

  it('should handle validation errors', async () => {
    request.body = {}
    const parseSpy = vi
      .spyOn(
        z.object({
          mapId: z.string(),
          position: z.object({ x: z.number(), y: z.number() }),
          name: z.string(),
        }),
        'parse',
      )
      .mockImplementation(() => {
        throw new z.ZodError([
          {
            code: 'invalid_type',
            expected: 'string',
            received: 'undefined',
            path: ['mapId'],
            message: 'Required',
          },
          {
            code: 'invalid_type',
            expected: 'object',
            received: 'undefined',
            path: ['position'],
            message: 'Required',
          },
          {
            code: 'invalid_type',
            expected: 'string',
            received: 'undefined',
            path: ['name'],
            message: 'Required',
          },
        ])
      })

    try {
      await updateWaypointController(request, reply)
    } catch (e) {
      expect(e).toBeInstanceOf(z.ZodError)
      expect(e.errors).toEqual([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['mapId'],
          message: 'Required',
        },
        {
          code: 'invalid_type',
          expected: 'object',
          received: 'undefined',
          path: ['position'],
          message: 'Required',
        },
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['name'],
          message: 'Required',
        },
      ])
    }
    parseSpy.mockRestore()
  })

  it('should handle updateWaypoint errors', async () => {
    updateWaypoint.mockRejectedValue(new Error('Update Error'))

    try {
      await updateWaypointController(request, reply)
    } catch (e) {
      expect(e.message).toBe('Update Error')
    }
  })
})
