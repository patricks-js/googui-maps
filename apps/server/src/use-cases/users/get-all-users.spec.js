import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { getAllUsers } from './get-all-users.js'

describe('Get all users use case', () => {
  let mockSelect

  beforeEach(() => {
    mockSelect = vi.spyOn(db, 'select').mockReturnValue({
      from: vi
        .fn()
        .mockResolvedValue([
          { id: '1', username: 'Mocked User', email: 'mocked@email.com' },
        ]),
    })
  })

  afterEach(() => {
    mockSelect.mockRestore()
  })

  it('should be able to get all users', async () => {
    const result = await getAllUsers()

    const expected = {
      users: [{ id: '1', username: 'Mocked User', email: 'mocked@email.com' }],
    }

    expect(result).toEqual(expected)
  })

  it('should return an empty array if no users exist', async () => {
    mockSelect.mockReturnValue({
      from: vi.fn().mockResolvedValue([]),
    })

    const result = await getAllUsers()

    const expected = { users: [] }

    expect(result).toEqual(expected)
  })
})
