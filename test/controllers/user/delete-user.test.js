import { beforeEach, describe, expect, it, vi } from "vitest";
import { deleteUser } from "../../../src/data/usecases/user/delete-user.js";
import { deleteUserController } from "../../../src/http/controllers/user/delete-user.js";

vi.mock("../../../src/data/usecases/user/delete-user.js");

describe("deleteUserController", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = {
      params: {
        id: "123"
      }
    };

    reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    };
  });

  it("should delete a user and return 204 status code", async () => {
    deleteUser.mockResolvedValue();

    await deleteUserController(request, reply);

    expect(deleteUser).toHaveBeenCalledWith(request.params.id);
    expect(reply.status).toHaveBeenCalledWith(204);
    expect(reply.send).not.toHaveBeenCalled();
  });

  it("should return 400 status code if deleteUser throws an error", async () => {
    const error = new Error("Database error");
    deleteUser.mockRejectedValue(error);

    await deleteUserController(request, reply);

    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith(error);
  });
});
