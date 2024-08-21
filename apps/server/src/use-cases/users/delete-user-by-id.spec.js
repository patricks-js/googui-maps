import { afterEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../db/connection.js'
import { deleteUserById } from './delete-user-by-id.js'

describe('Delete user by id use case', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should be able to delete a user by id', async () => {
    vi.spyOn(db.query.users, 'findFirst').mockReturnValue({
      id: '1',
    })
    vi.spyOn(db, 'delete').mockReturnValue({
      where: vi.fn().mockReturnThis(),
    })

    await expect(deleteUserById('1')).resolves.toBeUndefined()
    expect(db.delete).toHaveBeenCalledTimes(1)
  })

  it('should throw an error if user does not exist', async () => {
    vi.spyOn(db.query.users, 'findFirst').mockReturnValue(undefined)

    await expect(deleteUserById('1')).rejects.toThrowError('User not found.')
    expect(db.delete).not.toHaveBeenCalled()
  })
})
