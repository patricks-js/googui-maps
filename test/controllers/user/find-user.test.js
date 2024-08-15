import { beforeEach, describe, expect, it, vi } from "vitest";
import { findUser } from "../../../src/data/usecases/user/find-user.js";
import { findUserController } from "../../../src/http/controllers/user/find-user.js";

vi.mock("../../../src/data/usecases/user/find-user.js", () => ({
  findUser: vi.fn()
}));

vi.mock("../../../src/http/controllers/validators.js", () => ({
  validators: {
    idParamSchema: vi.fn((params) => ({ id: params.id }))
  }
}));

describe("findUserController", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = {
      params: { id: "66b6774920ed1fbdf7609d13" }
    };

    reply = {
      send: vi.fn()
    };
  });

  it("should find the user successfully", async () => {
    const user = { id: "66b6774920ed1fbdf7609d13", name: "Test User" };
    findUser.mockResolvedValue(user);

    await findUserController(request, reply);
    expect(findUser).toHaveBeenCalledWith("66b6774920ed1fbdf7609d13");
  });

  it("should handle errors from findUser", async () => {
    findUser.mockRejectedValue(new Error("Find User Error"));

    try {
      await findUserController(request, reply);
    } catch (e) {
      expect(e.message).toBe("Find User Error");
    }
    expect(findUser).toHaveBeenCalledWith("66b6774920ed1fbdf7609d13");
  });
});
