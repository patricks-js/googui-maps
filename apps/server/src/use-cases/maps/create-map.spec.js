import { describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { createMap } from './create-map.js'

vi.mock('../users/get-user-by-id.js', () => ({
  getUserById: vi.fn().mockResolvedValue('1'),
}))

describe('Create map use case', () => {
  it('should be able to create a map', async () => {
    const mockInsert = vi.spyOn(db, 'insert').mockReturnValue({
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue([{ mapId: 'mockedId' }]),
    })

    const result = await createMap({
      width: 100,
      height: 100,
      userId: '1',
    })

    expect(mockInsert).toHaveBeenCalledTimes(1)
    expect(result).toEqual({
      mapId: 'mockedId',
    })
  })
})
