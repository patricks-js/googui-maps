import { describe, expect, it, vi } from 'vitest'
import { deleteMap } from './delete-map.js'
import { getMapById } from './get-map-by-id.js'

vi.mock('./get-map-by-id.js', () => ({
  getMapById: vi.fn().mockResolvedValue({
    map: {
      id: 1,
      width: 100,
      height: 100,
      userId: '1',
    },
  }),
}))

vi.mock('../../db/connection.js', () => ({
  db: {
    delete: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
  },
}))

describe('Delete map use case', () => {
  it('should be able to delete a map', async () => {
    await deleteMap(1)

    expect(getMapById).toHaveBeenCalledWith(1)
  })
})
