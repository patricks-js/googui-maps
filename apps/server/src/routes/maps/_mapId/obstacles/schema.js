const unauthorizedResponse = {
  description: 'Unauthorized',
  type: 'object',
  properties: {
    statusCode: { type: 'number', example: 401 },
    error: { type: 'string', example: 'Unauthorized' },
    message: { type: 'string', example: 'Authentication failed' },
  },
}

const notFoundResponse = {
  description: 'Not found',
  type: 'object',
  properties: {
    statusCode: { type: 'number', example: 404 },
    error: { type: 'string', example: 'Not Found' },
    message: { type: 'string', example: 'Resource not found' },
  },
}

const obstacleSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    position: {
      type: 'object',
      properties: {
        x: { type: 'number' },
        y: { type: 'number' },
      },
    },
    size: { type: 'number' },
  },
}

export const getAllObstaclesSchema = {
  tags: ['obstacle'],
  params: {
    type: 'object',
    properties: {
      mapId: { type: 'number' },
    },
    required: ['mapId'],
  },
  response: {
    200: {
      description: 'List of all obstacles',
      type: 'object',
      properties: {
        obstacles: {
          type: 'array',
          items: obstacleSchema,
        },
      },
    },
    401: unauthorizedResponse,
    404: notFoundResponse,
  },
}

export const createObstacleSchema = {
  tags: ['obstacle'],
  params: {
    type: 'object',
    properties: {
      mapId: { type: 'number' },
    },
    required: ['mapId'],
  },
  body: {
    type: 'object',
    properties: {
      position: {
        type: 'object',
        properties: {
          x: { type: 'number' },
          y: { type: 'number' },
        },
      },
      size: { type: 'number' },
    },
    required: ['position', 'size'],
  },
  response: {
    201: {
      description: 'Obstacle created successfully',
      type: 'object',
      properties: {
        obstacleId: { type: 'number' },
      },
    },
    401: unauthorizedResponse,
    404: notFoundResponse,
  },
}

export const updateObstacleSchema = {
  tags: ['obstacle'],
  params: {
    type: 'object',
    properties: {
      mapId: { type: 'number' },
      obstacleId: { type: 'number' },
    },
    required: ['mapId', 'obstacleId'],
  },
  body: {
    type: 'object',
    properties: {
      position: {
        type: 'object',
        properties: {
          x: { type: 'number' },
          y: { type: 'number' },
        },
      },
      size: { type: 'number' },
    },
  },
  response: {
    200: {
      description: 'Obstacle updated successfully',
      type: 'object',
      properties: {
        updatedObstacle: obstacleSchema,
      },
    },
    401: unauthorizedResponse,
    404: notFoundResponse,
  },
}

export const deleteObstacleSchema = {
  tags: ['obstacle'],
  params: {
    type: 'object',
    properties: {
      mapId: { type: 'number' },
      obstacleId: { type: 'number' },
    },
    required: ['mapId', 'obstacleId'],
  },
  response: {
    204: {},
    401: unauthorizedResponse,
    404: notFoundResponse,
  },
}
