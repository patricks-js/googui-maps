import { afterEach, describe, expect, it, vi } from 'vitest'
import { Maps } from '../../../src/data/models/map.js'
import { deleteMap } from '../../../src/data/usecases/map/delete-map.js'

vi.mock('../../../src/data/models/map.js', () => ({
  Maps: {
    findByIdAndDelete: vi.fn(),
  },
}))

describe('deleteMap', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should delete an existing map', async () => {
    const id = '1234'
    const deletedMap = {
      id: '1234',
      name: 'Test Map',
      dimensions: {
        width: 100,
        height: 100,
      },
      obstacles: [
        { x: 10, y: 10 },
        { x: 20, y: 20 },
      ],
    }

    Maps.findById = vi.fn().mockResolvedValue(id)
    Maps.findByIdAndDelete = vi.fn().mockResolvedValue(deletedMap)

    await deleteMap(id)

    expect(Maps.findByIdAndDelete).toHaveBeenCalledWith(id)
  })

  it('should throw an error when deletion fails', async () => {
    const id = '1234'
    const errorMessage = 'Error deleting map'
    Maps.findByIdAndDelete.mockRejectedValue(new Error(errorMessage))

    await expect(deleteMap(id)).rejects.toThrow(errorMessage)

    expect(Maps.findByIdAndDelete).toHaveBeenCalledWith(id)
  })
})
