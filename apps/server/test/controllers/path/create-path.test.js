import { beforeEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { createPath } from '../../../src/data/usecases/path/create-path.js'
import { createPathController } from '../../../src/http/controllers/path/create-path.js'

const bodySchema = z.object({
  mapId: z.string(),
  start: z.object({
    x: z.number(),
    y: z.number(),
  }),
  end: z.object({
    x: z.number(),
    y: z.number(),
  }),
  distance: z.number(),
})

vi.mock('../../../src/data/usecases/path/create-path.js', () => ({
  createPath: vi.fn(),
}))

describe('createPathController', () => {
  let request
  let reply

  beforeEach(() => {
    request = {
      body: {
        mapId: 'map123',
        start: { x: 1, y: 1 },
        end: { x: 10, y: 10 },
        distance: 100,
      },
    }

    reply = {
      send: vi.fn(),
      status: vi.fn(() => reply),
    }

    createPath.mockResolvedValue({ success: true, pathId: 'path123' })

    vi.spyOn(bodySchema, 'parse').mockImplementation((data) => data) // Mock parse method
  })

  it('should create the path successfully', async () => {
    await createPathController(request, reply)

    expect(createPath).toHaveBeenCalledWith({
      mapId: 'map123',
      start: { x: 1, y: 1 },
      end: { x: 10, y: 10 },
      distance: 100,
    })
  })

  it('should handle validation errors', async () => {
    request.body = {} // Invalid body

    vi.spyOn(bodySchema, 'parse').mockImplementation(() => {
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
          path: ['start'],
          message: 'Required',
        },
        {
          code: 'invalid_type',
          expected: 'object',
          received: 'undefined',
          path: ['end'],
          message: 'Required',
        },
        {
          code: 'invalid_type',
          expected: 'number',
          received: 'undefined',
          path: ['distance'],
          message: 'Required',
        },
      ])
    })

    try {
      await createPathController(request, reply)
    } catch (e) {
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
          path: ['start'],
          message: 'Required',
        },
        {
          code: 'invalid_type',
          expected: 'object',
          received: 'undefined',
          path: ['end'],
          message: 'Required',
        },
        {
          code: 'invalid_type',
          expected: 'number',
          received: 'undefined',
          path: ['distance'],
          message: 'Required',
        },
      ])
    }
  })

  it('should handle errors from createPath', async () => {
    createPath.mockRejectedValue(new Error('Create Path Error'))

    try {
      await createPathController(request, reply)
    } catch (e) {
      expect(e.message).toBe('Create Path Error')
    }
  })
})
