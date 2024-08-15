import { describe, expect, it, vi } from 'vitest'
import { Maps } from '../../../src/data/models/map.js'
import { findMapById } from '../../../src/data/usecases/map/find-map.js'

// Mock the `Maps` model methods
vi.mock('../../../src/data/models/map.js', () => ({
  Maps: {
    findById: vi.fn(),
  },
}))

describe('findMapById', () => {
  afterEach(() => {
    vi.clearAllMocks() // Clear mocks after each test
  })

  it('should return the map when found by id', async () => {
    const id = '123'
    const map = {
      id: '123',
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

    Maps.findById.mockResolvedValue(map)

    const result = await findMapById(id)

    expect(Maps.findById).toHaveBeenCalledWith(id)
    expect(result).toEqual(map)
  })

  it('should throw an error when the map is not found', async () => {
    const id = '123'
    const errorMessage = `Couldn't find map with id: ${id}`

    Maps.findById.mockRejectedValue(new Error(errorMessage))

    await expect(findMapById(id)).rejects.toThrow(errorMessage)

    expect(Maps.findById).toHaveBeenCalledWith(id)
  })
})
