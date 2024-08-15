import { beforeEach, describe, expect, it, vi } from 'vitest'
import { deleteMap } from '../../../src/data/usecases/map/delete-map.js'
import { deleteMapController } from '../../../src/http/controllers/map/delete-map.js'
import { validators } from '../../../src/http/validators.js'

vi.mock('../../../src/data/usecases/map/delete-map.js', () => ({
  deleteMap: vi.fn(),
}))

vi.mock('../../../src/http/validators.js', () => ({
  validators: {
    idParamSchema: vi.fn(),
  },
}))

describe('deleteMapController', () => {
  let request
  let reply

  beforeEach(() => {
    request = {
      params: { id: '123' },
    }

    reply = {
      status: vi.fn(() => reply),
      send: vi.fn(),
    }

    validators.idParamSchema.mockImplementation((params) => ({
      id: params.id,
    }))
    deleteMap.mockResolvedValue()
  })

  it('should delete the map successfully', async () => {
    await deleteMapController(request, reply)
    expect(validators.idParamSchema).toHaveBeenCalledWith(request.params)
    expect(deleteMap).toHaveBeenCalledWith('123')
    expect(reply.status).toHaveBeenCalledWith(204)
    expect(reply.send).toHaveBeenCalled()
  })

  it('should handle errors from deleteMap', async () => {
    deleteMap.mockRejectedValue(new Error('Delete Error'))

    try {
      await deleteMapController(request, reply)
    } catch (e) {
      expect(e.message).toBe('Delete Error')
    }
  })
})
