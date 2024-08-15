import { beforeEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { createObstacle } from '../../../src/data/usecases/obstacle/create-obstacle.js'
import { createObstacleController } from '../../../src/http/controllers/obstacle/create-obstacle.js'

vi.mock('../../../src/data/usecases/obstacle/create-obstacle.js', () => ({
  createObstacle: vi.fn(),
}))

describe('createObstacleController', () => {
  let request
  let reply

  beforeEach(() => {
    request = {
      body: {
        mapId: 'map123',
        position: { x: 5, y: 5 },
        size: 10,
      },
    }

    reply = {
      send: vi.fn(),
      status: vi.fn(() => reply),
    }

    createObstacle.mockResolvedValue({ id: 'obstacle123', ...request.body })
  })

  it('should create the obstacle successfully', async () => {
    await createObstacleController(request, reply)

    expect(createObstacle).toHaveBeenCalledWith(request.body)
  })

  it('should handle validation errors', async () => {
    request.body = { mapId: 'map123', position: { x: '5', y: 5 }, size: 10 } // Invalid position.x type

    try {
      await createObstacleController(request, reply)
    } catch (e) {
      expect(e).toBeInstanceOf(z.ZodError)
    }
  })

  it('should handle errors from createObstacle', async () => {
    createObstacle.mockRejectedValue(new Error('Create Obstacle Error'))

    try {
      await createObstacleController(request, reply)
    } catch (e) {
      expect(e.message).toBe('Create Obstacle Error')
    }
  })
})
