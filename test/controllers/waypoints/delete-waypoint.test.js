import { beforeEach, describe, expect, it, vi } from 'vitest'
import { deleteWaypoint } from '../../../src/data/usecases/waypoint/delete-waypoint.js'
import { deleteWaypointController } from '../../../src/http/controllers/waypoint/delete-waypoint.js'
import { NotFoundError, ServerError } from '../../../src/http/errors.js'
import { validators } from '../../../src/http/validators.js'

vi.mock('../../../src/data/usecases/waypoint/delete-waypoint.js')
vi.mock('../../../src/http/validators.js')

describe('deleteWaypointController', () => {
  const request = {
    params: { id: 'waypoint123' },
  }
  const reply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should delete a waypoint successfully', async () => {
    validators.idParamSchema.mockReturnValue({ id: 'waypoint123' })

    await deleteWaypointController(request, reply)

    expect(validators.idParamSchema).toHaveBeenCalledWith(request.params)
    expect(deleteWaypoint).toHaveBeenCalledWith('waypoint123')
    expect(reply.status).toHaveBeenCalledWith(204)
    expect(reply.send).toHaveBeenCalled()
  })

  it('should handle NotFoundError if waypoint is not found', async () => {
    validators.idParamSchema.mockReturnValue({ id: 'waypoint123' })
    deleteWaypoint.mockRejectedValue(
      new NotFoundError('Waypoint with id waypoint123 not found'),
    )

    try {
      await deleteWaypointController(request, reply)
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundError)
      expect(e.message).toBe('Waypoint with id waypoint123 not found')
    }

    expect(validators.idParamSchema).toHaveBeenCalledWith(request.params)
    expect(deleteWaypoint).toHaveBeenCalledWith('waypoint123')
  })

  it('should handle ServerError if there is an error deleting the waypoint', async () => {
    validators.idParamSchema.mockReturnValue({ id: 'waypoint123' })
    deleteWaypoint.mockRejectedValue(
      new ServerError('Error at deleting Waypoint'),
    )

    try {
      await deleteWaypointController(request, reply)
    } catch (e) {
      expect(e).toBeInstanceOf(ServerError)
      expect(e.message).toBe('Error at deleting Waypoint')
    }

    expect(validators.idParamSchema).toHaveBeenCalledWith(request.params)
    expect(deleteWaypoint).toHaveBeenCalledWith('waypoint123')
  })
})
