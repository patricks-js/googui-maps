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

describe('Waypoint Routes (e2e)', () => {
  let _server
  let _token
  const waypointId = 1
  const baseUrl = '/api/maps/1/waypoints'

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
    await db.execute(sql`TRUNCATE TABLE tb_waypoints RESTART IDENTITY CASCADE`)
    await db.delete(users)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a waypoint', async () => {
    const response = await _server
      .post(baseUrl)
      .set('Authorization', `Bearer ${_token}`)
      .send({
        name: 'test',
        position: {
          x: 100,
          y: 100,
        },
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      newWaypoint: expect.objectContaining({ name: 'test' }),
    })
  })

  it('should get all waypoints of a map', async () => {
    const data = {
      name: 'test',
      position: {
        x: 100,
        y: 100,
      },
    }

    await _server
      .post(baseUrl)
      .set('Authorization', `Bearer ${_token}`)
      .send(data)
      .expect(201)

    await _server
      .post(baseUrl)
      .set('Authorization', `Bearer ${_token}`)
      .send(data)
      .expect(201)

    const response = await _server
      .get(baseUrl)
      .set('Authorization', `Bearer ${_token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      waypoints: expect.arrayContaining([
        expect.objectContaining({ name: 'test' }),
      ]),
    })
  })

  it('should update a waypoint', async () => {
    const data = {
      name: 'test',
      position: {
        x: 100,
        y: 100,
      },
    }

    const { body } = await _server
      .post(baseUrl)
      .set('Authorization', `Bearer ${_token}`)
      .send(data)
      .expect(201)

    const response = await _server
      .put(`${baseUrl}/${waypointId}`)
      .set('Authorization', `Bearer ${_token}`)
      .send({ name: 'testUpdated' })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      updatedWaypoint: expect.objectContaining({ name: 'testUpdated' }),
    })
  })

  it('should delete a waypoint', async () => {
    const data = {
      name: 'test',
      position: {
        x: 100,
        y: 100,
      },
    }

    const { body } = await _server
      .post(baseUrl)
      .set('Authorization', `Bearer ${_token}`)
      .send(data)
      .expect(201)

    const response = await _server
      .delete(`${baseUrl}/${waypointId}`)
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
    const response = await _server.get(`${baseUrl}`)

    expect(response.statusCode).toBe(401)
  })
})
