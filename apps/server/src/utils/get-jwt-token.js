import request from 'supertest'
import { app } from '../config/app.js'

async function createTestUser(userData) {
  await request(app.server).post('/api/users/auth/register').send(userData)
}

async function loginTestUser(userData) {
  const { body } = await request(app.server)
    .post('/api/users/auth/login')
    .send(userData)

  return body
}

export async function getTestJWTToken() {
  await createTestUser({
    username: 'test',
    email: 'test@test.com',
    password: 'test',
  })

  const { token } = await loginTestUser({
    email: 'test@test.com',
    password: 'test',
  })

  return { token }
}
