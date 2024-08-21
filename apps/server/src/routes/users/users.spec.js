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
import { app } from '../../config/app'
import { db } from '../../db/connection'
import { users } from '../../db/schema'
import { getTestJWTToken } from '../../utils/get-jwt-token'

describe('User Routes (e2e)', () => {
  let _server
  const baseUrl = '/api/users'
  const registerUrl = `${baseUrl}/auth/register`
  const loginUrl = `${baseUrl}/auth/login`
  const profileUrl = `${baseUrl}/profile`

  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(async () => {
    _server = await request(app.server)
  })

  afterEach(async () => {
    await db.delete(users)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('Register a New User', () => {
    describe('Given a username, email and password', () => {
      it('should register a user successfully', async () => {
        const { body } = await _server.post(registerUrl).send({
          username: 'test',
          email: 'test@test.com',
          password: 'test',
        })

        expect(body).toEqual(
          expect.objectContaining({ userId: expect.any(String) }),
        )
      })
      it('should be able to authenticate a user', async () => {
        const response = await getTestJWTToken()

        expect(response).toEqual(
          expect.objectContaining({ token: expect.any(String) }),
        )
      })
    })

    describe('When a credentials are invalid or already exists', () => {
      it('should return a 400 if credentials are invalid', async () => {
        await _server.post(registerUrl).send({
          username: 'test',
          email: 'test@test.com',
          password: 'test',
        })

        const response = await _server.post(loginUrl).send({
          email: 'test@test2.com',
          password: 'wrong_password',
        })

        expect(response.statusCode).toBe(400)
      })
      it('should return a 409 if user already exists', async () => {
        await _server.post(registerUrl).send({
          username: 'test',
          email: 'test@test.com',
          password: 'test',
        })

        const response = await _server.post(registerUrl).send({
          username: 'test',
          email: 'test@test.com',
          password: 'test',
        })

        expect(response.statusCode).toBe(409)
      })
    })
  })

  describe('Manage User Profile', () => {
    it('should get a user profile', async () => {
      const { token } = await getTestJWTToken()

      const response = await _server
        .get(profileUrl)
        .set('Authorization', `Bearer ${token}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({
        user: expect.objectContaining({ username: 'test' }),
      })
    })
    it('should update a user profile', async () => {
      const { token } = await getTestJWTToken()

      const response = await _server
        .put(baseUrl)
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'test2',
        })

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({
        user: expect.objectContaining({ username: 'test2' }),
      })
    })
    it('should delete a user profile', async () => {
      const { token } = await getTestJWTToken()

      const response = await _server
        .delete(baseUrl)
        .set('Authorization', `Bearer ${token}`)

      expect(response.statusCode).toBe(204)
    })
    it('should return a 401 if user is not authenticated', async () => {
      const response = await _server.get(profileUrl)

      expect(response.statusCode).toBe(401)
    })
    it('should return a 403 if user is not an admin', async () => {
      const { token } = await getTestJWTToken()

      const response = await _server
        .get(baseUrl)
        .set('Authorization', `Bearer ${token}`)

      expect(response.statusCode).toBe(403)
    })
  })
})
