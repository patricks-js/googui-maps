import { afterEach, describe, expect, it, vi } from 'vitest'
import { Obstacle } from '../../../src/data/models/obstacle.js'
import { updateObstacle } from '../../../src/data/usecases/obstacle/update-obstacle.js'
import { ServerError } from '../../../src/http/errors.js'

vi.mock('../../../src/data/models/obstacle.js', () => ({
  Obstacle: {
    findByIdAndUpdate: vi.fn(),
  },
}))

describe('updateObstacle', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should update an existing obstacle', async () => {
    const id = '1234'
    const newObstacle = {
      x: 30,
      y: 40,
    }

    const updatedObstacle = {
      id: '1234',
      x: 30,
      y: 40,
    }

    Obstacle.findById = vi.fn().mockResolvedValue(id)
    Obstacle.findByIdAndUpdate = vi.fn().mockResolvedValue(updatedObstacle)

    const result = await updateObstacle(id, newObstacle)

    expect(Obstacle.findByIdAndUpdate).toHaveBeenCalledWith(id, newObstacle, {
      new: true,
    })

    expect(result).toEqual(updatedObstacle)
  })

  it('should throw an error when the update fails', async () => {
    const id = '1234'
    const newObstacle = {
      x: 30,
      y: 40,
    }

    Obstacle.findById = vi.fn().mockResolvedValue(id)
    Obstacle.findByIdAndUpdate = vi
      .fn()
      .mockRejectedValue(new ServerError('Error updating obstacle'))

    await expect(updateObstacle(id, newObstacle)).rejects.toThrow(
      'Error updating obstacle',
    )

    expect(Obstacle.findByIdAndUpdate).toHaveBeenCalledWith(id, newObstacle, {
      new: true,
    })
  })
})
