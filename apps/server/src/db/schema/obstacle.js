import { relations } from 'drizzle-orm'
import { integer, pgTable, point, serial } from 'drizzle-orm/pg-core'
import { maps } from './map.js'

export const obstacles = pgTable('tb_obstacles', {
  id: serial('obstacle_id').primaryKey(),
  position: point('position', { mode: 'xy' }).notNull(),
  size: integer('size').notNull(),
  mapId: integer('map_id')
    .references(() => maps.id, { onDelete: 'cascade' })
    .notNull(),
})

export const obstaclesRelations = relations(obstacles, ({ many, one }) => ({
  map: one(maps, {
    fields: [obstacles.mapId],
    references: [maps.id],
  }),
}))
