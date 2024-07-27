import { describe, expect, it, vi } from "vitest";
import { updateUser } from "../../../src/data/usecases/user/update-user.js";
import { updateUserController } from "../../../src/http/controllers/user/update-user.js";

vi.mock("../../../src/data/usecases/user/update-user.js");

describe("updateUserController", () => {
  it("should return 204 and the updated user when the update is successful", async () => {
    const updatedUser = {
      id: "123",
      username: "newUsername",
      email: "newemail@example.com"
    };
    updateUser.mockResolvedValue(updatedUser);

    const request = {
      params: { id: "123" },
      body: { username: "newUsername", email: "newemail@example.com" }
    };
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    };

    await updateUserController(request, reply);

    expect(reply.status).toHaveBeenCalledWith(204);
    expect(reply.send).toHaveBeenCalledWith(updatedUser);
  });

  it("should return 400 if the body data is invalid", async () => {
    const request = {
      params: { id: "123" },
      body: { username: "", email: "invalid-email" }
    };
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    };

    await updateUserController(request, reply);

    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalled();
  });
});
