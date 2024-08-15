import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.string().transform(Number),
})

export const env = envSchema.parse(process.env)
