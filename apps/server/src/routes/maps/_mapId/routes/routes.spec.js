import { sql } from 'drizzle-orm'
import request from 'supertest'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { app } from '../../../../config/app.js'
import { db } from '../../../../db/connection.js'
import { users } from '../../../../db/schema/user.js'
import { getTestJWTToken } from '../../../../utils/get-jwt-token.js'

describe('Route Routes (e2e)', () => {
  let _server
  let _token
  const routeId = 1
  const baseUrl = '/api/maps/1/routes'

  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(async () => {
    const { token } = await getTestJWTToken()
    _token = token
    _server = await request(app.server)

    await _server
      .post('/api/maps')
      .set('Authorization', `Bearer ${_token}`)
      .send({
        width: 100,
        height: 100,
      })
  })

  afterEach(async () => {
    await db.execute(sql`TRUNCATE TABLE tb_maps RESTART IDENTITY CASCADE`)
    await db.execute(sql`TRUNCATE TABLE tb_routes RESTART IDENTITY CASCADE`)
    await db.delete(users)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a routes', async () => {
    const data = {
      distance: 100,
      start: {
        x: 100,
        y: 100,
      },
      end: {
        x: 200,
        y: 200,
      },
    }

    const response = await _server
      .post(baseUrl)
      .set('Authorization', `Bearer ${_token}`)
      .send(data)

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      newRoute: expect.objectContaining(data),
    })
  })

  it('should get a route of a map', async () => {
    const data = {
      distance: 100,
      start: {
        x: 100,
        y: 100,
      },
      end: {
        x: 200,
        y: 200,
      },
    }

    await _server
      .post(baseUrl)
      .set('Authorization', `Bearer ${_token}`)
      .send(data)

    const response = await _server
      .get(`${baseUrl}/${routeId}`)
      .set('Authorization', `Bearer ${_token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ route: expect.objectContaining(data) })
  })

  it('should delete a route', async () => {
    const data = {
      distance: 100,
      start: {
        x: 100,
        y: 100,
      },
      end: {
        x: 200,
        y: 200,
      },
    }

    await _server
      .post(baseUrl)
      .set('Authorization', `Bearer ${_token}`)
      .send(data)

    const response = await _server
      .delete(`${baseUrl}/${routeId}`)
      .set('Authorization', `Bearer ${_token}`)

    expect(response.statusCode).toBe(204)
  })

  it('should return 404 when a waypoint does not exist', async () => {
    const response = await _server
      .get(`${baseUrl}/2`)
      .set('Authorization', `Bearer ${_token}`)

    expect(response.statusCode).toBe(404)
  })

  it('should return 401 when not authenticated', async () => {
    const response = await _server.get(`${baseUrl}/${routeId}`)

    expect(response.statusCode).toBe(401)
  })
})
