import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { UserAlreadyExistsError } from '../_errors/user-already-exists.js'
import { getAllUsers } from './get-all-users.js'
import { registerUser } from './register-user.js'

vi.mock('crypto', () => ({
  randomUUID: vi.fn().mockReturnValue('mockedId'),
}))

describe('Register user use case', () => {
  let mockSelect
  let mockInsert
  const newUser = {
    username: 'username',
    email: 'email@email.com',
    password: 'password',
  }

  beforeEach(() => {
    mockSelect = vi.spyOn(db.query.users, 'findFirst').mockReturnValue(null)

    mockInsert = vi.spyOn(db, 'insert').mockReturnValue({
      values: vi.fn().mockReturnThis(),
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should be able to register a user', async () => {
    const result = await registerUser(newUser)

    expect(mockInsert).toHaveBeenCalledTimes(1)
    expect(result).toEqual({
      userId: 'mockedId',
    })
  })

  it('should throw an error if user already exists', async () => {
    mockSelect = vi.spyOn(db.query.users, 'findFirst').mockReturnValue({
      id: '1',
    })

    expect(mockInsert).toHaveBeenCalledTimes(0)
    await expect(registerUser(newUser)).rejects.toThrowError(
      'User already exists.',
    )
  })
})
