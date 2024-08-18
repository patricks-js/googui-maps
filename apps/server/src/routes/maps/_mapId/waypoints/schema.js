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

const waypointSchema = {
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
    name: { type: 'string' },
  },
}

export const getAllWaypointsSchema = {
  tags: ['waypoint'],
  params: {
    type: 'object',
    properties: {
      mapId: { type: 'number' },
    },
    required: ['mapId'],
  },
  response: {
    200: {
      description: 'List of all waypoints',
      type: 'object',
      properties: {
        waypoints: {
          type: 'array',
          items: waypointSchema,
        },
      },
    },
    401: unauthorizedResponse,
    404: notFoundResponse,
  },
}

export const createWaypointSchema = {
  tags: ['waypoint'],
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
      name: { type: 'string' },
    },
    required: ['position', 'name'],
  },
  response: {
    201: {
      description: 'Waypoint created successfully',
      type: 'object',
      properties: {
        newWaypoint: waypointSchema,
      },
    },
    401: unauthorizedResponse,
    404: notFoundResponse,
  },
}

export const updateWaypointSchema = {
  tags: ['waypoint'],
  params: {
    type: 'object',
    properties: {
      mapId: { type: 'number' },
      waypointId: { type: 'number' },
    },
    required: ['mapId', 'waypointId'],
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
      name: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Waypoint updated successfully',
      type: 'object',
      properties: {
        updatedWaypoint: waypointSchema,
      },
    },
    401: unauthorizedResponse,
    404: notFoundResponse,
  },
}

export const deleteWaypointSchema = {
  tags: ['waypoint'],
  params: {
    type: 'object',
    properties: {
      mapId: { type: 'number' },
      waypointId: { type: 'number' },
    },
    required: ['mapId', 'waypointId'],
  },
  response: {
    204: {},
    401: unauthorizedResponse,
    404: notFoundResponse,
  },
}
