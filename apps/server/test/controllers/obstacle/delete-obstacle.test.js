import { beforeEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { deleteObstacle } from '../../../src/data/usecases/obstacle/delete-obstacle.js'
import { deleteObstacleController } from '../../../src/http/controllers/obstacle/delete-obstacle.js'

vi.mock('../../../src/data/usecases/obstacle/delete-obstacle.js', () => ({
  deleteObstacle: vi.fn(),
}))

describe('deleteObstacleController', () => {
  let request
  let reply

  beforeEach(() => {
    request = {
      params: { id: 'obstacle123' },
    }

    reply = {
      status: vi.fn(() => reply),
      send: vi.fn(),
    }
  })

  it('should delete the obstacle successfully', async () => {
    deleteObstacle.mockResolvedValue()

    await deleteObstacleController(request, reply)

    expect(deleteObstacle).toHaveBeenCalledWith('obstacle123')
  })

  it('should handle validation errors', async () => {
    request.params.id = 123 // Invalid ID type

    try {
      await deleteObstacleController(request, reply)
    } catch (e) {
      expect(e).toBeInstanceOf(z.ZodError)
    }
  })

  it('should handle errors from deleteObstacle', async () => {
    deleteObstacle.mockRejectedValue(new Error('Delete Obstacle Error'))

    try {
      await deleteObstacleController(request, reply)
    } catch (e) {
      expect(e.message).toBe('Delete Obstacle Error')
    }

    expect(deleteObstacle).toHaveBeenCalledWith('obstacle123')
  })
})
