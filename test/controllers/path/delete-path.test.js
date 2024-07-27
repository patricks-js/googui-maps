import Fastify from "fastify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { deletePath } from "../../../src/data/usecases/path/delete-path.js";
import { deletePathController } from "../../../src/http/controllers/path/delete-path.js";

vi.mock("../../../src/data/usecases/path/delete-path.js");

describe("deletePathController", () => {
  let fastify;

  beforeEach(() => {
    fastify = Fastify();
    fastify.delete("/path/:id", deletePathController);
    vi.clearAllMocks();
  });

  it("should delete a path and return 200 status code", async () => {
    const mockPathId = "123";
    deletePath.mockResolvedValue({ _id: mockPathId });

    const response = await fastify.inject({
      method: "DELETE",
      url: `/path/${mockPathId}`
    });

    expect(response.statusCode).toBe(200);
    expect(deletePath).toHaveBeenCalledWith(mockPathId);
  });

  it("should return 400 status code if validation fails", async () => {
    const response = await fastify.inject({
      method: "DELETE",
      url: "/path/"
    });

    expect(response.statusCode).toBe(400);
    const body = JSON.parse(response.body);
    expect(body).toHaveProperty("error", "Bad Request");
    expect(body).toHaveProperty("message");
  });

  it("should return 404 status code if path not found", async () => {
    const mockPathId = "123";
    deletePath.mockResolvedValue(null);

    const response = await fastify.inject({
      method: "DELETE",
      url: `/path/${mockPathId}`
    });

    expect(response.statusCode).toBe(404);
    const body = JSON.parse(response.body);
    expect(body).toHaveProperty("error", "Path not found");
  });

  it("should return 404 status code if deletePath throws an error", async () => {
    const mockPathId = "123";
    deletePath.mockRejectedValue(new Error("Error deleting path"));

    const response = await fastify.inject({
      method: "DELETE",
      url: `/path/${mockPathId}`
    });

    expect(response.statusCode).toBe(404);
    const body = JSON.parse(response.body);
    expect(body).toHaveProperty("error", "Error deleting path");
  });
});
