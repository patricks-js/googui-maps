import { beforeEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { verifyMap } from '../../../src/data/usecases/map/verify-map.js'
import { verifyMapController } from '../../../src/http/controllers/map/verify-map.js'

const mapSchema = z.object({
  map_id: z.string(),
  start_point: z.object({
    x: z.number(),
    y: z.number(),
  }),
  destination_point: z.object({
    x: z.number(),
    y: z.number(),
  }),
})

vi.mock('../../../src/data/usecases/map/verify-map.js', () => ({
  verifyMap: vi.fn(),
}))

describe('verifyMapController', () => {
  let request
  let reply

  beforeEach(() => {
    request = {
      body: {
        map_id: 'map123',
        start_point: { x: 1, y: 1 },
        destination_point: { x: 10, y: 10 },
      },
    }

    reply = {
      send: vi.fn(),
      status: vi.fn(() => reply),
    }

    verifyMap.mockResolvedValue({ success: true, message: 'Map verified' })

    // Mock parse method
    vi.spyOn(mapSchema, 'parse').mockImplementation((data) => data)
  })

  it('should verify the map successfully', async () => {
    await verifyMapController(request, reply)

    expect(verifyMap).toHaveBeenCalledWith(
      'map123',
      { x: 1, y: 1 },
      { x: 10, y: 10 },
    )
  })

  it('should handle validation errors', async () => {
    request.body = {} // Invalid body

    vi.spyOn(mapSchema, 'parse').mockImplementation(() => {
      throw new z.ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['map_id'],
          message: 'Required',
        },
        {
          code: 'invalid_type',
          expected: 'object',
          received: 'undefined',
          path: ['start_point'],
          message: 'Required',
        },
        {
          code: 'invalid_type',
          expected: 'object',
          received: 'undefined',
          path: ['destination_point'],
          message: 'Required',
        },
      ])
    })

    try {
      await verifyMapController(request, reply)
    } catch (e) {
      expect(e.errors).toEqual([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['map_id'],
          message: 'Required',
        },
        {
          code: 'invalid_type',
          expected: 'object',
          received: 'undefined',
          path: ['start_point'],
          message: 'Required',
        },
        {
          code: 'invalid_type',
          expected: 'object',
          received: 'undefined',
          path: ['destination_point'],
          message: 'Required',
        },
      ])
    }
  })

  it('should handle errors from verifyMap', async () => {
    verifyMap.mockRejectedValue(new Error('Verify Error'))

    try {
      await verifyMapController(request, reply)
    } catch (e) {
      expect(e.message).toBe('Verify Error')
    }
  })
})
