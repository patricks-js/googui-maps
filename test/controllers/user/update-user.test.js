import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { updateUser } from "../../../src/data/usecases/user/update-user.js";
import { updateUserController } from "../../../src/http/controllers/user/update-user.js";

vi.mock("../../../src/data/usecases/user/update-user.js", () => ({
  updateUser: vi.fn()
}));

vi.mock("../../../src/http/controllers/validators.js", () => ({
  validators: {
    idParamSchema: vi.fn((params) => ({ id: params.id }))
  }
}));

describe("updateUserController", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = {
      params: { id: "66b6774920ed1fbdf7609d13" },
      body: {
        username: "testuser",
        email: "test@example.com",
        _id: "66b6774920ed1fbdf7609d13"
      }
    };

    reply = {
      status: vi.fn(() => reply),
      send: vi.fn()
    };
  });

  it("should update the user successfully", async () => {
    updateUser.mockResolvedValue({ success: true, message: "User updated" });

    await updateUserController(request, reply);

    expect(updateUser).toHaveBeenCalledWith("66b6774920ed1fbdf7609d13", {
      username: "testuser",
      email: "test@example.com",
      _id: "66b6774920ed1fbdf7609d13"
    });
  });

  it("should handle validation errors", async () => {
    request.body.email = "invalid-email"; // Invalid email

    try {
      await updateUserController(request, reply);
    } catch (e) {
      expect(e).toBeInstanceOf(z.ZodError);
      expect(e.errors[0].path).toContain("email");
    }
  });

  it("should handle errors from updateUser", async () => {
    updateUser.mockRejectedValue(new Error("Update User Error"));

    try {
      await updateUserController(request, reply);
    } catch (e) {
      expect(e.message).toBe("Update User Error");
    }

    expect(updateUser).toHaveBeenCalledWith("66b6774920ed1fbdf7609d13", {
      username: "testuser",
      email: "test@example.com",
      _id: "66b6774920ed1fbdf7609d13"
    });
  });
});
