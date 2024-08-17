import { beforeEach, describe, expect, it, vi } from 'vitest'
import { findWaypoint } from '../../../src/data/usecases/waypoint/find-waypoint.js'
import { findWaypointController } from '../../../src/http/controllers/waypoint/find-waypoint.js'
import { NotFoundError, ServerError } from '../../../src/http/errors.js'
import { validators } from '../../../src/http/validators.js'

vi.mock('../../../src/data/usecases/waypoint/find-waypoint.js')
vi.mock('../../../src/http/validators.js')

describe('findWaypointController', () => {
  const request = {
    params: { id: 'waypoint123' },
  }
  const reply = {
    send: vi.fn(),
    code: vi.fn().mockReturnThis(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should find a waypoint successfully', async () => {
    const waypoint = {
      id: 'waypoint123',
      name: 'Test Waypoint',
      position: { x: 1, y: 2 },
    }
    validators.idParamSchema.mockReturnValue({ id: 'waypoint123' })
    findWaypoint.mockResolvedValue(waypoint)

    await findWaypointController(request, reply)

    expect(validators.idParamSchema).toHaveBeenCalledWith(request.params)
    expect(findWaypoint).toHaveBeenCalledWith('waypoint123')
  })

  it('should handle NotFoundError if waypoint is not found', async () => {
    validators.idParamSchema.mockReturnValue({ id: 'waypoint123' })
    findWaypoint.mockRejectedValue(
      new NotFoundError('Waypoint with id waypoint123 not found'),
    )

    try {
      await findWaypointController(request, reply)
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundError)
      expect(e.message).toBe('Waypoint with id waypoint123 not found')
    }

    expect(validators.idParamSchema).toHaveBeenCalledWith(request.params)
    expect(findWaypoint).toHaveBeenCalledWith('waypoint123')
  })

  it('should handle ServerError if there is an error finding the waypoint', async () => {
    validators.idParamSchema.mockReturnValue({ id: 'waypoint123' })
    findWaypoint.mockRejectedValue(new ServerError('Error at finding Waypoint'))

    try {
      await findWaypointController(request, reply)
    } catch (e) {
      expect(e).toBeInstanceOf(ServerError)
      expect(e.message).toBe('Error at finding Waypoint')
    }

    expect(validators.idParamSchema).toHaveBeenCalledWith(request.params)
    expect(findWaypoint).toHaveBeenCalledWith('waypoint123')
  })
})
