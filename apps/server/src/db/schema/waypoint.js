import { relations } from 'drizzle-orm'
import { integer, pgTable, point, serial, varchar } from 'drizzle-orm/pg-core'
import { maps } from './map.js'

export const waypoints = pgTable('tb_waypoints', {
  id: serial('waypoint_id').primaryKey(),
  name: varchar('name').notNull(),
  position: point('position', { mode: 'xy' }).notNull(),
  mapId: integer('map_id')
    .references(() => maps.id)
    .notNull(),
})

export const waypointsRelations = relations(waypoints, ({ many, one }) => ({
  map: one(maps, {
    fields: [waypoints.mapId],
    references: [maps.id],
  }),
}))
