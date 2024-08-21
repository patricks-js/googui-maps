import bcrypt from 'bcryptjs'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { authenticateUser } from './authenticate.js'

describe('Authenticate user use case', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should be able to authenticate a user', async () => {
    vi.spyOn(bcrypt, 'compare').mockResolvedValue(true)
    vi.spyOn(db.query.users, 'findFirst').mockResolvedValue({
      id: '1',
      username: 'test',
      email: 'test@test.com',
      password: 'password',
      role: 'user',
    })

    const credentials = {
      email: 'test@test.com',
      password: 'password',
    }

    const result = await authenticateUser(credentials)

    expect(result).toEqual({
      user: {
        id: '1',
        username: 'test',
        email: 'test@test.com',
        password: 'password',
        role: 'user',
      },
    })
  })

  it('should throw an error if email is invalid', async () => {
    vi.spyOn(db.query.users, 'findFirst').mockResolvedValue(null)

    const credentials = {
      email: 'wrongEmail',
      password: 'password',
    }

    await expect(authenticateUser(credentials)).rejects.toThrowError(
      'Invalid credentials.',
    )
  })

  it('should throw an error if password is invalid', async () => {
    vi.spyOn(bcrypt, 'compare').mockResolvedValue(false)
    vi.spyOn(db.query.users, 'findFirst').mockResolvedValue({
      id: '1',
      username: 'test',
      email: 'test@test.com',
      password: 'password',
      role: 'user',
    })

    const credentials = {
      email: 'test@test.com',
      password: 'wrongPassword',
    }

    await expect(authenticateUser(credentials)).rejects.toThrowError(
      'Invalid credentials.',
    )
  })
})
