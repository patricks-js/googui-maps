import bcrypt from 'bcryptjs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { getUserById } from './get-user-by-id.js'
import { updateUserProfile } from './update-user-profile.js'

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('hashedpassword123'),
  },
}))

vi.mock('./get-user-by-id.js', () => ({
  getUserById: vi.fn().mockResolvedValue({
    id: '1',
    username: 'existinguser',
    email: 'existing@example.com',
    password: 'oldhashedpassword',
  }),
}))

vi.mock('../../db/connection.js', () => ({
  db: {
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    returning: vi.fn().mockResolvedValue([
      {
        id: '1',
        username: 'updateduser',
        email: 'updated@example.com',
        password: 'hashedpassword123',
      },
    ]),
  },
}))

describe('Update user profile use case', () => {
  const userId = '1'
  const changedUser = {
    id: '1',
    username: 'updateduser',
    email: 'updated@example.com',
    password: 'hashedpassword123',
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be able to update a user profile completely', async () => {
    const changes = {
      username: 'updateduser',
      email: 'updated@example.com',
      password: 'newpassword',
    }

    const result = await updateUserProfile(userId, changes)

    expect(getUserById).toHaveBeenCalledWith(userId)
    expect(result.user).toEqual(expect.objectContaining(changedUser))
  })

  it('should be able to update a user password', async () => {
    const changes = {
      password: 'newpassword',
    }

    const result = await updateUserProfile(userId, changes)

    expect(getUserById).toHaveBeenCalledWith(userId)
    expect(result.user).toEqual(changedUser)
  })

  it('should be able to update a user password', async () => {
    const changes = {
      email: 'updated@example.com',
    }

    const result = await updateUserProfile(userId, changes)

    expect(getUserById).toHaveBeenCalledWith(userId)
    expect(result.user).toEqual(changedUser)
  })

  it('should be able to update a user email', async () => {
    const changes = {}

    await updateUserProfile(userId, changes)

    expect(getUserById).toHaveBeenCalledWith(userId)
  })
})
