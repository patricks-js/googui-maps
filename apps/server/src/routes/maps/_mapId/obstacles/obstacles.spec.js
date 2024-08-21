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

describe('Obstacle Routes (e2e)', () => {
  let _server
  let _token
  const obstacleId = 1
  const baseUrl = '/api/maps/1/obstacles'

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
    await db.execute(sql`TRUNCATE TABLE tb_obstacles RESTART IDENTITY CASCADE`)
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
        size: 100,
        position: {
          x: 100,
          y: 100,
        },
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      newObstacle: expect.objectContaining({ size: 100 }),
    })
  })

  it('should get all waypoints of a map', async () => {
    const data = {
      size: 100,
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
      obstacles: expect.arrayContaining([
        expect.objectContaining({ size: 100 }),
      ]),
    })
  })

  it('should update a waypoint', async () => {
    const data = {
      size: 100,
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
      .put(`${baseUrl}/${obstacleId}`)
      .set('Authorization', `Bearer ${_token}`)
      .send({ size: 80 })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      updatedObstacle: expect.objectContaining({ size: 80 }),
    })
  })

  it('should delete a waypoint', async () => {
    const data = {
      size: 100,
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
      .delete(`${baseUrl}/${obstacleId}`)
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
