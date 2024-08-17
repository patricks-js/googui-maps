export const findRouteSchema = {
  schema: {
    tags: ['route'],
    body: {
      type: 'object',
      required: ['map_id', 'start_point', 'end_point'],
      properties: {
        map_id: { type: 'string' },
        start_point: {
          type: 'object',
          required: ['x', 'y'],
          properties: {
            x: { type: 'number' },
            y: { type: 'number' },
          },
        },
        end_point: {
          type: 'object',
          required: ['x', 'y'],
          properties: {
            x: { type: 'number' },
            y: { type: 'number' },
          },
        },
      },
    },
  },
}
