import { beforeEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { updateObstacle } from '../../../src/data/usecases/obstacle/update-obstacle.js'
import { updateObstacleController } from '../../../src/http/controllers/obstacle/update-obstacle.js'
import { validators } from '../../../src/http/validators.js'

vi.mock('../../../src/data/usecases/obstacle/update-obstacle.js', () => ({
  updateObstacle: vi.fn(),
}))

vi.mock('../../../src/http/validators.js', () => ({
  validators: {
    idParamSchema: vi.fn(),
  },
}))

describe('updateObstacleController', () => {
  let request
  let reply

  beforeEach(() => {
    request = {
      params: { id: 'obstacle123' },
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

    updateObstacle.mockResolvedValue({ id: 'obstacle123', ...request.body })
    validators.idParamSchema.mockReturnValue({ id: 'obstacle123' })
  })

  it('should update the obstacle successfully', async () => {
    await updateObstacleController(request, reply)

    expect(validators.idParamSchema).toHaveBeenCalledWith(request.params)
    expect(updateObstacle).toHaveBeenCalledWith('obstacle123', request.body)
  })

  it('should handle validation errors', async () => {
    request.body = { mapId: 'map123', position: { x: '5', y: 5 }, size: 10 } // Invalid position.x type

    try {
      await updateObstacleController(request, reply)
    } catch (e) {
      expect(e).toBeInstanceOf(z.ZodError)
    }
  })

  it('should handle errors from updateObstacle', async () => {
    updateObstacle.mockRejectedValue(new Error('Update Obstacle Error'))

    try {
      await updateObstacleController(request, reply)
    } catch (e) {
      expect(e.message).toBe('Update Obstacle Error')
    }
  })
})
