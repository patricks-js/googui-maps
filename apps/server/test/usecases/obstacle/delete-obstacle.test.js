import { afterEach, describe, expect, it, vi } from 'vitest'
import { Obstacle } from '../../../src/data/models/obstacle.js'
import { deleteObstacle } from '../../../src/data/usecases/obstacle/delete-obstacle.js'
import { ServerError } from '../../../src/http/errors.js'

vi.mock('../../../src/data/models/obstacle.js', () => ({
  Obstacle: {
    findByIdAndDelete: vi.fn(),
  },
}))

describe('deleteObstacle', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should delete an obstacle successfully', async () => {
    const id = '123'
    const deletedObstacle = { id: '123', x: 10, y: 20 }

    Obstacle.findById = vi.fn().mockResolvedValue(id)
    Obstacle.findByIdAndDelete.mockResolvedValue(deletedObstacle)

    const result = await deleteObstacle(id)

    expect(Obstacle.findByIdAndDelete).toHaveBeenCalledWith(id)
    expect(result).toEqual(deletedObstacle)
  })

  it('should throw an error when deletion fails', async () => {
    const id = '123'
    const errorMessage = 'Error deleting obstacle'

    Obstacle.findByIdAndDelete.mockRejectedValue(new ServerError(errorMessage))

    await expect(deleteObstacle(id)).rejects.toThrow(errorMessage)

    expect(Obstacle.findByIdAndDelete).toHaveBeenCalledWith(id)
  })
})
