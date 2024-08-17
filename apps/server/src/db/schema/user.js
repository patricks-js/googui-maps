import { relations } from 'drizzle-orm'
import {
  pgEnum,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { maps } from './map.js'

export const roleEnum = pgEnum('role', ['common', 'admin'])

export const users = pgTable(
  'tb_users',
  {
    id: uuid('user_id').primaryKey(),
    username: varchar('username').notNull(),
    email: varchar('email').notNull().unique(),
    password: varchar('password').notNull(),
    role: roleEnum('role').default('common'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex('idx_email').on(table.email),
    }
  },
)

export const usersRelations = relations(users, ({ many }) => ({
  maps: many(maps),
}))
