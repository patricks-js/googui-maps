import { vi } from 'vitest'
import { ZodError } from 'zod'
import { Node } from '../../../src/data/models/node.js'
import { findBestRouteFromJSON } from '../../../src/data/usecases/route/find-route.js'
import { findRouteController } from '../../../src/http/controllers/route/find-route.js'
import { BadRequestError, NotFoundError } from '../../../src/http/errors.js'

vi.mock('../../../src/data/models/node.js', () => ({
  Node: {
    create: vi.fn(),
  },
}))

vi.mock('../../../src/data/usecases/route/find-route.js', () => ({
  findBestRouteFromJSON: vi.fn(),
}))

describe('findRouteController', () => {
  let request
  let reply

  beforeEach(() => {
    request = {
      body: {
        map_id: 'map1',
        start_point: { x: 10, y: 20 },
        stop_points: [{ x: 15, y: 25 }],
        end_point: { x: 20, y: 30 },
      },
    }

    reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    }

    findBestRouteFromJSON.mockReset()
    Node.create.mockReset()
  })

  it('should return 200 and a success message when the route is valid and exists', async () => {
    findBestRouteFromJSON.mockResolvedValue({ optimal_path: [] })

    await findRouteController(request, reply)

    expect(findBestRouteFromJSON).toHaveBeenCalledWith(request.body)
    expect(Node.create).toHaveBeenCalledWith({ optimal_path: [] })
    expect(reply.status).toHaveBeenCalledWith(200)
  })

  it('should throw a BadRequestError when the input data is invalid', async () => {
    request.body = {
      map_id: 'map1',
      start_point: { x: 10, y: '20' }, // Invalid type
      stop_points: [{ x: 15, y: 25 }],
      end_point: { x: 20, y: 30 },
    }

    await expect(findRouteController(request, reply)).rejects.toThrow(ZodError)

    expect(findBestRouteFromJSON).not.toHaveBeenCalled()
    expect(Node.create).not.toHaveBeenCalled()
  })

  it('should throw a NotFoundError when the route does not exist', async () => {
    findBestRouteFromJSON.mockRejectedValue(new NotFoundError('No path found'))

    await expect(findRouteController(request, reply)).rejects.toThrow(
      NotFoundError,
    )

    expect(findBestRouteFromJSON).toHaveBeenCalledWith(request.body)
    expect(Node.create).not.toHaveBeenCalled()
  })
})
