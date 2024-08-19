import { describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { getUserById } from './get-user-by-id.js'

describe('Get user by id use case', () => {
  it('should be able to get a user by id', async () => {
    const mockedUser = {
      id: '1',
      username: 'username',
      email: 'email@email.com',
      role: 'common',
    }

    vi.spyOn(db.query.users, 'findFirst').mockReturnValue(mockedUser)

    const result = await getUserById('1')

    expect(result).toEqual({
      user: mockedUser,
    })
  })

  it('should throw an error if user does not exist', async () => {
    vi.spyOn(db.query.users, 'findFirst').mockReturnValue(null)

    await expect(getUserById('1')).rejects.toThrowError('User not found.')
  })
})
