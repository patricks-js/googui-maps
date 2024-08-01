import { beforeEach, describe, expect, it, vi } from "vitest";
import { createUser } from "../../../src/data/usecases/user/create-user.js";
import { createUserController } from "../../../src/http/controllers/user/create-user.js";

vi.mock("../../../src/data/usecases/user/create-user.js");

describe("createUserController", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = {
      body: {
        username: "testuser",
        email: "testuser@example.com"
      }
    };

    reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    };
  });

  it("should create a user and return 201 status code", async () => {
    const mockUser = {
      id: "123",
      username: "testuser",
      email: "testuser@example.com"
    };
    createUser.mockResolvedValue(mockUser);

    await createUserController(request, reply);

    expect(createUser).toHaveBeenCalledWith(request.body);
    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith(mockUser);
  });

  it("should return 400 status code if validation fails", async () => {
    request.body.email = "invalid-email";

    await createUserController(request, reply);

    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalled();
  });

  it("should return 400 status code if createUser throws an error", async () => {
    const error = new Error("Database error");
    createUser.mockRejectedValue(error);

    await createUserController(request, reply);

    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith(error);
  });
});
