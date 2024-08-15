import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Path } from '../../../src/data/models/path.js'
import { findPath } from '../../../src/data/usecases/path/find-path.js'

vi.mock('../../../src/data/models/path.js')

describe('findPath', () => {
  const mockPath = {
    _id: '123',
    distance: 100,
    start: 'A',
    end: 'B',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should find and return the path if it exists', async () => {
    Path.findById = vi.fn().mockResolvedValue(mockPath)

    const result = await findPath(mockPath._id)

    expect(Path.findById).toHaveBeenCalledWith(mockPath._id)
    expect(result).toEqual(mockPath)
  })

  it('should throw an error if the path does not exist', async () => {
    Path.findById = vi.fn().mockResolvedValue(null)

    await expect(findPath(mockPath._id)).rejects.toThrow('Path not found')

    expect(Path.findById).toHaveBeenCalledWith(mockPath._id)
  })

  it('should throw an error if finding the path fails', async () => {
    const errorMessage = 'Error finding path'
    Path.findById = vi.fn().mockRejectedValue(new Error(errorMessage))

    await expect(findPath(mockPath._id)).rejects.toThrow(errorMessage)

    expect(Path.findById).toHaveBeenCalledWith(mockPath._id)
  })
})
