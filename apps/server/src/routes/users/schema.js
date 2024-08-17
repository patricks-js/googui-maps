const unauthorizedResponse = {
  description: 'Unauthorized',
  type: 'object',
  properties: {
    statusCode: { type: 'number', example: 401 },
    error: { type: 'string', example: 'Unauthorized' },
    message: { type: 'string', example: 'Authentication failed' },
  },
}

const forbiddenResponse = {
  description: 'Forbidden',
  type: 'object',
  properties: {
    statusCode: { type: 'number', example: 403 },
    error: { type: 'string', example: 'Forbidden' },
    message: { type: 'string', example: 'Insufficient permissions' },
  },
}

const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    username: { type: 'string' },
    email: { type: 'string' },
  },
}

export const registerSchema = {
  tags: ['user'],
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
    },
    required: ['username', 'email', 'password'],
  },
  response: {
    201: {
      description: 'User registered successfully',
      type: 'object',
      properties: {
        userId: { type: 'string' },
      },
    },
  },
}

export const loginSchema = {
  tags: ['user'],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
    },
    required: ['email', 'password'],
  },
  response: {
    200: {
      description: 'Login successful',
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
    401: unauthorizedResponse,
  },
}

export const getAllUsersSchema = {
  tags: ['user'],
  response: {
    200: {
      description: 'List of users',
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: userSchema,
        },
      },
    },
    401: unauthorizedResponse,
    403: forbiddenResponse,
  },
}

export const getUserByIdSchema = {
  tags: ['user'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
  },
  response: {
    200: {
      description: 'User details',
      type: 'object',
      properties: {
        user: userSchema,
      },
    },
    401: unauthorizedResponse,
    404: {
      description: 'User not found',
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        error: { type: 'string', example: 'Not Found' },
        message: { type: 'string', example: 'User not found' },
      },
    },
  },
}

export const updateUserProfileSchema = {
  tags: ['user'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'User profile updated',
      type: 'object',
      properties: {
        user: userSchema,
      },
    },
    401: unauthorizedResponse,
    404: {
      description: 'User not found',
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        error: { type: 'string', example: 'Not Found' },
        message: { type: 'string', example: 'User not found' },
      },
    },
  },
}

export const deleteUserSchema = {
  tags: ['user'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
  },
  response: {
    204: {},
    401: unauthorizedResponse,
    404: {
      description: 'User not found',
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        error: { type: 'string', example: 'Not Found' },
        message: { type: 'string', example: 'User not found' },
      },
    },
  },
}
