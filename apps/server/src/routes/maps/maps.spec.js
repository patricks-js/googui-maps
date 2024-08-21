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
import { app } from '../../config/app.js'
import { db } from '../../db/connection.js'
import { users } from '../../db/schema/user.js'
import { getTestJWTToken } from '../../utils/get-jwt-token.js'

describe('Maps Routes (e2e)', () => {
  let _server
  let _token
  const baseUrl = '/api/maps'
  const mapId = 1

  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(async () => {
    const { token } = await getTestJWTToken()
    _token = token

    _server = await request(app.server)
  })

  afterEach(async () => {
    await db.execute(sql`TRUNCATE TABLE tb_maps RESTART IDENTITY CASCADE`)
    await db.delete(users)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a map', async () => {
    const response = await _server
      .post(baseUrl)
      .set('Authorization', `Bearer ${_token}`)
      .send({
        width: 100,
        height: 100,
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      mapId: expect.any(Number),
    })
  })

  it('should get a map', async () => {
    const data = { width: 100, height: 100 }

    const { body } = await _server
      .post(baseUrl)
      .set('Authorization', `Bearer ${_token}`)
      .send(data)
      .expect(201)

    console.log(body)

    const response = await _server
      .get(`${baseUrl}/${mapId}`)
      .set('Authorization', `Bearer ${_token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ map: data })
  })

  it('should update a map', async () => {
    const data = { width: 100, height: 100 }

    const { body } = await _server
      .post(baseUrl)
      .set('Authorization', `Bearer ${_token}`)
      .send(data)
      .expect(201)

    const mapId = body.mapId

    const response = await _server
      .put(`${baseUrl}/${mapId}`)
      .set('Authorization', `Bearer ${_token}`)
      .send({ width: 200 })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      updatedMap: expect.objectContaining({ width: 200 }),
    })
  })

  it('should delete a map', async () => {
    const data = { width: 100, height: 100 }

    const { body } = await _server
      .post(baseUrl)
      .set('Authorization', `Bearer ${_token}`)
      .send(data)
      .expect(201)

    const response = await _server
      .delete(`${baseUrl}/${mapId}`)
      .set('Authorization', `Bearer ${_token}`)

    expect(response.statusCode).toBe(204)
  })

  it('should return 404 when a map does not exist', async () => {
    const response = await _server
      .get(`${baseUrl}/2`)
      .set('Authorization', `Bearer ${_token}`)

    expect(response.statusCode).toBe(404)
  })

  it('should return 401 when not authenticated', async () => {
    const response = await _server.get(`${baseUrl}/${mapId}`)

    expect(response.statusCode).toBe(401)
  })
})
