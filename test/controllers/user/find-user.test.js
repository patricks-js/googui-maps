import { describe, expect, it, vi } from "vitest";
import { findUser } from "../../../src/data/usecases/user/find-user.js";
import { findUserController } from "../../../src/http/controllers/user/find-user.js";

vi.mock("../../../src/data/usecases/user/find-user.js");

describe("findUserController", () => {
  it("should return 204 and the user when a user is found", async () => {
    const user = { id: "123", name: "John Doe" };
    findUser.mockResolvedValue(user);

    const request = { params: { id: "123" } };
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    };

    await findUserController(request, reply);

    expect(reply.status).toHaveBeenCalledWith(204);
    expect(reply.send).toHaveBeenCalledWith(user);
  });

  it("should return 400 if the user ID is invalid", async () => {
    const request = { params: { id: 0 } };
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    };

    await findUserController(request, reply);

    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalled();
  });
});
