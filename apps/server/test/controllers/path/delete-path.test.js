import { beforeEach, describe, expect, it, vi } from 'vitest'
import { deletePath } from '../../../src/data/usecases/path/delete-path.js'
import { deletePathController } from '../../../src/http/controllers/path/delete-path.js'
import { validators } from '../../../src/http/validators.js'

vi.mock('../../../src/data/usecases/path/delete-path.js', () => ({
  deletePath: vi.fn(),
}))

vi.mock('../../../src/http/validators.js', () => ({
  validators: {
    idParamSchema: vi.fn(),
  },
}))

describe('deletePathController', () => {
  let request
  let reply

  beforeEach(() => {
    request = {
      params: { id: 'path123' },
    }

    reply = {
      send: vi.fn(),
      status: vi.fn(() => reply),
    }

    deletePath.mockResolvedValue({ success: true })

    validators.idParamSchema.mockImplementation((params) => params)
  })

  it('should delete the path successfully', async () => {
    await deletePathController(request, reply)

    expect(validators.idParamSchema).toHaveBeenCalledWith(request.params)

    expect(deletePath).toHaveBeenCalledWith('path123')
  })

  it('should handle validation errors', async () => {
    validators.idParamSchema.mockImplementation(() => {
      throw new Error('Validation Error')
    })

    try {
      await deletePathController(request, reply)
    } catch (e) {
      expect(e.message).toBe('Validation Error')
    }
  })

  it('should handle errors from deletePath', async () => {
    deletePath.mockRejectedValue(new Error('Delete Path Error'))

    try {
      await deletePathController(request, reply)
    } catch (e) {
      expect(e.message).toBe('Delete Path Error')
    }
  })
})
