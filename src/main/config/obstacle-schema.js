export const obstaclePostSchema = {
  schema: {
    tags: ["obstacle"],
    response: {
      201: {
        description: "Obstacle created successfully",
        type: "object",
        properties: {
          _id: { type: "string" },
          mapId: { type: "string" },
          position: {
            type: "object",
            properties: {
              x: { type: "number" },
              y: { type: "number" }
            }
          },
          size: { type: "number" }
        }
      }
    },
    body: {
      type: "object",
      required: ["mapId", "position", "size"],
      properties: {
        mapId: { type: "string" },
        position: {
          type: "object",
          required: ["x", "y"],
          properties: {
            x: { type: "number" },
            y: { type: "number" }
          }
        },
        size: { type: "number" }
      }
    }
  }
};

export const obstacleGetSchema = {
  schema: {
    tags: ["obstacle"],
    response: {
      200: {
        description: "Obstacle found successfully",
        type: "object",
        properties: {
          _id: { type: "string" },
          mapId: { type: "string" },
          position: {
            type: "object",
            properties: {
              x: { type: "number" },
              y: { type: "number" }
            }
          },
          size: { type: "number" }
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

export const obstacleDeleteSchema = {
  schema: {
    tags: ["obstacle"],
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
