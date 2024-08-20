import { describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { getMapById } from './get-map-by-id.js'

describe('Get map by id use case', () => {
  it('should be able to get a map by id', async () => {
    vi.spyOn(db.query.maps, 'findFirst').mockResolvedValue({
      id: '1',
      name: 'test',
      width: 100,
      height: 100,
      userId: '1',
      obstacles: [],
    })

    const result = await getMapById('1')

    expect(result).toEqual({
      map: {
        id: '1',
        name: 'test',
        width: 100,
        height: 100,
        userId: '1',
        obstacles: [],
      },
    })
  })

  it('should throw an error if map is not found', async () => {
    vi.spyOn(db.query.maps, 'findFirst').mockResolvedValue(null)

    await expect(getMapById('1')).rejects.toThrowError('Map not found.')
  })
})
