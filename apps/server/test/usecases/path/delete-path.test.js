import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Path } from '../../../src/data/models/path.js'
import { deletePath } from '../../../src/data/usecases/path/delete-path.js'
import { ServerError } from '../../../src/http/errors.js'

vi.mock('../../../src/data/models/path.js')

describe('deletePath', () => {
  const mockPath = {
    _id: '123',
    distance: 100,
    start: 'A',
    end: 'B',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should delete and return the path if it exists', async () => {
    Path.findById = vi.fn().mockResolvedValue(mockPath._id)
    Path.findByIdAndDelete = vi.fn().mockResolvedValue(mockPath)

    const result = await deletePath(mockPath._id)

    expect(Path.findByIdAndDelete).toHaveBeenCalledWith(mockPath._id)
    expect(result).toBeFalsy()
  })

  it('should throw an error if the path does not exist', async () => {
    Path.findById = vi.fn().mockResolvedValue(null)

    await expect(deletePath(mockPath._id)).rejects.toThrow(
      `Path with id ${mockPath._id} not found`,
    )

    expect(Path.findById).toHaveBeenCalledWith(mockPath._id)
  })

  it('should throw an error if deleting the path fails', async () => {
    const errorMessage = 'Error deleting path'

    Path.findById = vi.fn().mockResolvedValue(mockPath._id)
    Path.findByIdAndDelete = vi
      .fn()
      .mockRejectedValue(new ServerError(errorMessage))

    await expect(deletePath(mockPath._id)).rejects.toThrow(errorMessage)

    expect(Path.findByIdAndDelete).toHaveBeenCalledWith(mockPath._id)
  })
})
