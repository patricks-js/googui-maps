export const waypointPostSchema = {
  schema: {
    tags: ['waypoint'],
    201: {
      description: 'Waypoint created successfully',
      type: 'object',
      properties: {
        _id: { type: 'string' },
        mapId: { type: 'string' },
        position: {
          x: { type: 'number' },
          y: { type: 'number' },
        },
        name: { type: 'string' },
      },
    },
    body: {
      type: 'object',
      required: ['mapId', 'position', 'name'],
      properties: {
        mapId: { type: 'string' },
        position: {
          type: 'object',
          required: ['x', 'y'],
          properties: {
            x: { type: 'number' },
            y: { type: 'number' },
          },
        },
        name: { type: 'string' },
      },
    },
  },
}

export const waypointGetSchema = {
  schema: {
    tags: ['waypoint'],
    response: {
      200: {
        description: 'Waypoint found successfully',
        type: 'object',
        properties: {
          _id: { type: 'string' },
          mapId: { type: 'string' },
          position: {
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
            },
          },
          name: { type: 'string' },
        },
      },
    },
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
      },
    },
  },
}

export const waypointPutSchema = {
  schema: {
    tags: ['waypoint'],
    response: {
      200: {
        description: 'Waypoint updated successfully',
        type: 'object',
        properties: {
          _id: { type: 'string' },
          mapId: { type: 'string' },
          position: {
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
            },
          },
          name: { type: 'string' },
        },
      },
    },
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
      },
    },
    body: {
      type: 'object',
      required: ['mapId', 'position', 'name'],
      properties: {
        mapId: { type: 'string' },
        position: {
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

export const waypointDeleteSchema = {
  schema: {
    tags: ['waypoint'],
    response: { 204: {} },
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
      },
    },
  },
}
