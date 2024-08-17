import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import { env } from '../config/env'

const client = postgres(env.DATABASE_URL, { max: 1 })

try {
  await migrate(drizzle(client), {
    migrationsFolder: 'src/db/migrations',
  })

  console.log('Migrations successfully executed')
} catch (error) {
  console.error('Error executing migrations:', error)
  process.exit(1)
} finally {
  await client.end()
}
