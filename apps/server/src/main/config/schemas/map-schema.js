export const mapPostSchema = {
  schema: {
    tags: ['map'],
    response: {
      201: {
        description: 'Map created successfully',
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          dimensions: {
            type: 'object',
            properties: {
              width: { type: 'number' },
              height: { type: 'number' },
            },
          },
          obstacles: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                x: { type: 'number' },
                y: { type: 'number' },
              },
            },
          },
        },
      },
    },
    body: {
      type: 'object',
      required: ['name', 'dimensions', 'obstacles'],
      properties: {
        name: { type: 'string' },
        dimensions: {
          type: 'object',
          required: ['width', 'height'],
          properties: {
            width: { type: 'number' },
            height: { type: 'number' },
          },
        },
        obstacles: {
          type: 'array',
          items: {
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
  },
}

export const mapGetSchema = {
  schema: {
    tags: ['map'],
    response: {
      200: {
        description: 'Map retrieved successfully',
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          dimensions: {
            type: 'object',
            properties: {
              width: { type: 'number' },
              height: { type: 'number' },
            },
          },
          obstacles: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                x: { type: 'number' },
                y: { type: 'number' },
              },
            },
          },
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

export const mapPutSchema = {
  schema: {
    tags: ['map'],
    response: {
      200: {
        description: 'Map updated successfully',
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          dimensions: {
            type: 'object',
            properties: {
              width: { type: 'number' },
              height: { type: 'number' },
            },
          },
          obstacles: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                x: { type: 'number' },
                y: { type: 'number' },
              },
            },
          },
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
      required: ['name', 'dimensions', 'obstacles'],
      properties: {
        name: { type: 'string' },
        dimensions: {
          type: 'object',
          required: ['width', 'height'],
          properties: {
            width: { type: 'number' },
            height: { type: 'number' },
          },
        },
        obstacles: {
          type: 'array',
          items: {
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
  },
}

export const deleteMapSchema = {
  schema: {
    tags: ['map'],
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

export const mapVerifySchema = {
  schema: {
    tags: ['map'],
    response: {
      200: {
        type: 'object',
        properties: {
          description: {
            type: 'string',
            description:
              'Os pontos e o mapa são válidos e existem no banco de dados.',
          },
        },
      },
    },
    body: {
      type: 'object',
      required: ['map_id', 'start_point', 'destination_point'],
      properties: {
        map_id: { type: 'string' },
        start_point: {
          type: 'object',
          properties: { x: { type: 'number' }, y: { type: 'number' } },
        },
        destination_point: {
          type: 'object',
          properties: { x: { type: 'number' }, y: { type: 'number' } },
        },
      },
    },
  },
}

export const checkMapConfiguration = {
  schema: {
    tags: ['map'],
    response: {
      200: {
        description: 'Map configuration checked successfully',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
    body: {
      type: 'object',
      required: ['map_id'],
      properties: {
        map_id: { type: 'string' },
      },
    },
  },
}

export const verifyIdMapSchema = {
  schema: {
    tags: ['map'],
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
    body: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
      },
    },
  },
}
