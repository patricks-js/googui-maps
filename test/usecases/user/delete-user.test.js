import { beforeEach, describe, expect, it, vi } from "vitest";
import { User } from "../../../src/data/models/user.js";
import { deleteUser } from "../../../src/data/usecases/user/delete-user.js";

vi.mock("../../../src/data/models/user.js", () => ({
  User: {
    findById: vi.fn(),
    findByIdAndDelete: vi.fn()
  }
}));

describe("deleteUser", () => {
  const mockUserId = "1234567890abcdef";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should delete the user if the user exists", async () => {
    User.findById.mockResolvedValue({ _id: mockUserId });

    await deleteUser(mockUserId);

    expect(User.findById).toHaveBeenCalledWith(mockUserId);
    expect(User.findByIdAndDelete).toHaveBeenCalledWith(mockUserId);
  });

  it("should throw an error if the user does not exist", async () => {
    User.findById.mockResolvedValue(null);

    await expect(deleteUser(mockUserId)).rejects.toThrow(
      `User with id ${mockUserId} not found`
    );

    expect(User.findById).toHaveBeenCalledWith(mockUserId);
    expect(User.findByIdAndDelete).not.toHaveBeenCalled();
  });

  it("should throw an error if there is an issue deleting the user", async () => {
    User.findById.mockResolvedValue({ _id: mockUserId });
    User.findByIdAndDelete.mockRejectedValue(new Error("Error deleting user"));

    await expect(deleteUser(mockUserId)).rejects.toThrow("Error deleting user");

    expect(User.findById).toHaveBeenCalledWith(mockUserId);
    expect(User.findByIdAndDelete).toHaveBeenCalledWith(mockUserId);
  });
});
