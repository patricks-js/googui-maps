export const userPostSchema = {
  schema: {
    tags: ["user"],
    body: {
      type: "object",
      required: ["username", "email"],
      properties: {
        username: { type: "string" },
        email: { type: "string" }
      }
    },
    response: {
      201: {
        description: "User created successfully",
        type: "object",
        properties: {
          _id: { type: "string" },
          username: { type: "string" },
          email: { type: "string" }
        }
      }
    }
  }
};

export const userGetSchema = {
  schema: {
    tags: ["user"],
    response: {
      200: {
        description: "User found successfully",
        type: "object",
        properties: {
          _id: { type: "string" },
          username: { type: "string" },
          email: { type: "string" }
        }
      }
    },
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" }
      }
    }
  }
};

export const userDeleteSchema = {
  schema: {
    tags: ["user"],
    response: { 204: {} },
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" }
      }
    }
  }
};

export const userPutSchema = {
  schema: {
    tags: ["user"],
    response: {
      200: {
        description: "User updated successfully",
        type: "object",
        properties: {
          _id: { type: "string" },
          username: { type: "string" },
          email: { type: "string" }
        }
      }
    },
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" }
      }
    },
    body: {
      type: "object",
      required: ["username", "email"],
      properties: {
        _id: { type: "string" },
        username: { type: "string" },
        email: { type: "string" }
      }
    }
  }
};
