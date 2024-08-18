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
  description: 'Map not found',
  type: 'object',
  properties: {
    statusCode: { type: 'number', example: 404 },
    error: { type: 'string', example: 'Not Found' },
    message: { type: 'string', example: 'Map not found' },
  },
}

const mapSchema = {
  type: 'object',
  properties: {
    mapId: { type: 'string' },
    width: { type: 'number' },
    height: { type: 'number' },
  },
}

export const getMapByIdSchema = {
  tags: ['map'],
  params: {
    type: 'object',
    properties: {
      mapId: { type: 'string' },
    },
    required: ['mapId'],
  },
  response: {
    200: {
      description: 'Map details',
      type: 'object',
      properties: {
        map: mapSchema,
      },
    },
    401: unauthorizedResponse,
    404: notFoundResponse,
  },
}

export const createMapSchema = {
  tags: ['map'],
  body: {
    type: 'object',
    properties: {
      width: { type: 'number' },
      height: { type: 'number' },
    },
    required: ['width', 'height'],
  },
  response: {
    201: {
      description: 'Map created successfully',
      type: 'object',
      properties: {
        mapId: { type: 'string' },
      },
    },
    401: unauthorizedResponse,
  },
}

export const updateMapSchema = {
  tags: ['map'],
  params: {
    type: 'object',
    properties: {
      mapId: { type: 'string' },
    },
    required: ['mapId'],
  },
  body: {
    type: 'object',
    properties: {
      width: { type: 'number' },
      height: { type: 'number' },
    },
  },
  response: {
    200: {
      description: 'Map updated successfully',
      type: 'object',
      properties: {
        updatedMap: mapSchema,
      },
    },
    401: unauthorizedResponse,
    404: notFoundResponse,
  },
}

export const deleteMapSchema = {
  tags: ['map'],
  params: {
    type: 'object',
    properties: {
      mapId: { type: 'string' },
    },
    required: ['mapId'],
  },
  response: {
    204: {},
    401: unauthorizedResponse,
    404: notFoundResponse,
  },
}
