export const pathPostSchema = {
  schema: {
    tags: ['path'],
    body: {
      type: 'object',
      required: ['start', 'end', 'distance'],
      properties: {
        start: {
          type: 'object',
          properties: {
            x: { type: 'number' },
            y: { type: 'number' },
          },
        },
        end: {
          type: 'object',
          properties: {
            x: { type: 'number' },
            y: { type: 'number' },
          },
        },
        distance: { type: 'number' },
      },
    },
    response: {
      201: {
        description: 'Path created successfully',
        type: 'object',
        properties: {
          _id: { type: 'string' },
          start: {
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
            },
          },
          end: {
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
            },
          },
          distance: { type: 'number' },
        },
      },
    },
  },
}

export const pathGetSchema = {
  schema: {
    tags: ['path'],
    response: {
      200: {
        description: 'Path retrieved successfully',
        type: 'object',
        properties: {
          _id: { type: 'string' },
          start: {
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
            },
          },
          end: {
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
            },
          },
          distance: { type: 'number' },
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

export const pathPutSchema = {
  schema: {
    tags: ['path'],
    response: {
      200: {
        description: 'Path updated successfully',
        type: 'object',
        properties: {
          _id: { type: 'string' },
          mapId: { type: 'string' },
          start: {
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
            },
          },
          end: {
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
            },
          },
          distance: { type: 'number' },
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
      required: ['mapId', 'start', 'end', 'distance'],
      properties: {
        mapId: { type: 'string' },
        start: {
          type: 'object',
          properties: {
            x: { type: 'number' },
            y: { type: 'number' },
          },
        },
        end: {
          type: 'object',
          properties: {
            x: { type: 'number' },
            y: { type: 'number' },
          },
        },
        distance: { type: 'number' },
      },
    },
  },
}

export const deletePathSchema = {
  schema: {
    tags: ['path'],
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
