import { beforeEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { updatePath } from '../../../src/data/usecases/path/update-path.js'
import { updatePathController } from '../../../src/http/controllers/path/update-path.js'

vi.mock('../../../src/data/usecases/path/update-path.js', () => ({
  updatePath: vi.fn(),
}))

describe('updatePathController', () => {
  let request
  let reply

  beforeEach(() => {
    request = {
      params: { id: 'path123' },
      body: {
        mapId: 'map123',
        start: { x: 0, y: 0 },
        end: { x: 10, y: 10 },
        distance: 14.14,
      },
    }

    reply = {
      send: vi.fn(),
      status: vi.fn(() => reply), // Ensure chainability for `status`
    }

    // Mock successful response
    updatePath.mockResolvedValue({ success: true })
  })

  it('should update the path successfully', async () => {
    await updatePathController(request, reply)

    expect(updatePath).toHaveBeenCalledWith('path123', request.body)
  })

  it('should handle validation errors in params', async () => {
    request.params = { id: 123 } // Invalid ID type

    try {
      await updatePathController(request, reply)
    } catch (e) {
      expect(e).toBeInstanceOf(z.ZodError)
    }
  })

  it('should handle validation errors in body', async () => {
    request.body = {
      mapId: 'map123',
      start: { x: 0, y: 0 },
      end: { x: 10, y: 10 },
      distance: -14.14,
    } // Invalid distance

    try {
      await updatePathController(request, reply)
    } catch (e) {
      expect(e).toBeInstanceOf(z.ZodError)
    }
  })

  it('should handle errors from updatePath', async () => {
    updatePath.mockRejectedValue(new Error('Update Path Error'))

    try {
      await updatePathController(request, reply)
    } catch (e) {
      expect(e.message).toBe('Update Path Error')
    }
  })
})
