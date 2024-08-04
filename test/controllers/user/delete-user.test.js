import { beforeEach, describe, expect, it, vi } from "vitest";
import { deleteUser } from "../../../src/data/usecases/user/delete-user.js";
import { deleteUserController } from "../../../src/http/controllers/user/delete-user.js";

vi.mock("../../../src/data/usecases/user/delete-user.js", () => ({
  deleteUser: vi.fn()
}));

vi.mock("../../../src/http/controllers/validators.js", () => ({
  validators: {
    idParamSchema: vi.fn((params) => ({ id: params.id }))
  }
}));

describe("deleteUserController", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = {
      params: { id: "user123" }
    };

    reply = {
      status: vi.fn(() => reply),
      send: vi.fn()
    };
  });

  it("should delete the user successfully", async () => {
    deleteUser.mockResolvedValue();

    await deleteUserController(request, reply);

    expect(deleteUser).toHaveBeenCalledWith("user123");
  });

  it("should handle errors from deleteUser", async () => {
    deleteUser.mockRejectedValue(new Error("Delete User Error"));

    try {
      await deleteUserController(request, reply);
    } catch (e) {
      expect(e.message).toBe("Delete User Error");
    }

    expect(deleteUser).toHaveBeenCalledWith("user123");
  });
});
