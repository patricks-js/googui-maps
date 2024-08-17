import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, uuid } from 'drizzle-orm/pg-core'
import { obstacles } from './obstacle.js'
import { routes } from './route.js'
import { users } from './user.js'
import { waypoints } from './waypoint.js'

export const maps = pgTable('tb_maps', {
  id: serial('map_id').primaryKey(),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  bestPathId: integer('best_path_id').references(() => routes.id),
})

export const mapsRelations = relations(maps, ({ many, one }) => ({
  obstacles: many(obstacles),
  waypoints: many(waypoints),
  bestPath: one(routes, {
    fields: [maps.bestPathId],
    references: [routes.id],
    relationName: 'best_path',
  }),
  user: one(users, {
    fields: [maps.userId],
    references: [users.id],
  }),
}))
