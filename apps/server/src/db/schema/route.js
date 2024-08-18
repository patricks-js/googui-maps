import { integer, pgTable, point, serial } from 'drizzle-orm/pg-core'
import { maps } from './map.js'

export const routes = pgTable('tb_routes', {
  id: serial('route_id').primaryKey(),
  start: point('start', { mode: 'xy' }).notNull(),
  end: point('end', { mode: 'xy' }).notNull(),
  distance: integer('distance').notNull(),
  mapId: integer('map_id', { onDelete: 'cascade' })
    .references(() => maps.id)
    .notNull(),
})
