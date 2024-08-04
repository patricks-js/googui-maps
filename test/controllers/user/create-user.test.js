import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { createUser } from "../../../src/data/usecases/user/create-user.js";
import { createUserController } from "../../../src/http/controllers/user/create-user.js";

vi.mock("../../../src/data/usecases/user/create-user.js", () => ({
  createUser: vi.fn()
}));

describe("createUserController", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = {
      body: {
        username: "testuser",
        email: "test@example.com",
        _id: "user123"
      }
    };

    reply = {
      status: vi.fn(() => reply),
      send: vi.fn()
    };
  });

  it("should create a user successfully", async () => {
    createUser.mockResolvedValue(request.body);

    await createUserController(request, reply);

    expect(createUser).toHaveBeenCalledWith(request.body);
  });

  it("should handle validation errors", async () => {
    request.body = { username: "testuser", email: "invalid-email" }; // Invalid body

    try {
      await createUserController(request, reply);
    } catch (e) {
      expect(e).toBeInstanceOf(z.ZodError);
    }
  });

  it("should handle errors from createUser", async () => {
    createUser.mockRejectedValue(new Error("Create User Error"));

    try {
      await createUserController(request, reply);
    } catch (e) {
      expect(e.message).toBe("Create User Error");
    }

    expect(createUser).toHaveBeenCalledWith(request.body);
  });
});
