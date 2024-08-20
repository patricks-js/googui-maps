import { describe, expect, it, vi } from 'vitest'
import { updateMap } from './update-map.js'

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
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    returning: vi
      .fn()
      .mockResolvedValue([
        { updatedMap: { id: 1, width: 50, height: 60, userId: '1' } },
      ]),
  },
}))

describe('Update map use case', () => {
  const mapId = 1
  const changedMap = {
    id: 1,
    width: 50,
    height: 60,
    userId: '1',
  }

  it('should be able to update a map completely', async () => {
    const changes = {
      width: 50,
      height: 60,
    }

    const result = await updateMap(mapId, changes)

    expect(result.updatedMap).toEqual({
      updatedMap: expect.objectContaining(changedMap),
    })
  })

  it('should be able to update the map width', async () => {
    const changes = {
      width: 50,
    }

    const result = await updateMap(mapId, changes)

    expect(result.updatedMap).toEqual({
      updatedMap: expect.objectContaining(changedMap),
    })
  })

  it('should be able to update the map height', async () => {
    const changes = {
      height: 60,
    }

    const result = await updateMap(mapId, changes)

    expect(result.updatedMap).toEqual({
      updatedMap: expect.objectContaining(changedMap),
    })
  })
})
