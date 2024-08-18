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

const routeSchema = {
  type: 'object',
  properties: {
    routeId: { type: 'number' },
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
}

export const createRouteSchema = {
  tags: ['route'],
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
    required: ['start', 'end', 'distance'],
  },
  response: {
    201: {
      description: 'Route created successfully',
      type: 'object',
      properties: {
        newRoute: routeSchema,
      },
    },
    401: unauthorizedResponse,
    404: notFoundResponse,
  },
}

export const getRouteByIdSchema = {
  tags: ['route'],
  params: {
    type: 'object',
    properties: {
      mapId: { type: 'number' },
      routeId: { type: 'number' },
    },
    required: ['mapId', 'routeId'],
  },
  response: {
    200: {
      description: 'Route details',
      type: 'object',
      properties: {
        route: routeSchema,
      },
    },
    401: unauthorizedResponse,
    404: notFoundResponse,
  },
}

export const deleteRouteSchema = {
  tags: ['route'],
  params: {
    type: 'object',
    properties: {
      mapId: { type: 'number' },
      routeId: { type: 'number' },
    },
    required: ['mapId', 'routeId'],
  },
  response: {
    204: {},
    401: unauthorizedResponse,
    404: notFoundResponse,
  },
}
