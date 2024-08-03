import { describe, expect, it, vi } from "vitest";
import { User } from "../../../src/data/models/user.js";
import { updateUser } from "../../../src/data/usecases/user/update-user.js";

vi.mock("../../../src/data/models/user.js");

describe("updateUser", () => {
  const mockedUserId = "123";

  it("should update the user if found", async () => {
    const mockUser = { id: mockedUserId, name: "John Doe" };
    const changes = { name: "Jane Doe" };
    const updatedUser = { id: mockedUserId, name: "Jane Doe" };

    User.findById.mockResolvedValue(mockUser);
    User.findByIdAndUpdate.mockResolvedValue(updatedUser);

    const result = await updateUser(mockedUserId, changes);

    expect(User.findById).toHaveBeenCalledWith(mockedUserId);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(mockedUserId, changes, {
      new: true
    });
    expect(result).toEqual(updatedUser);
  });

  it("should throw an error if the user is not found", async () => {
    User.findById.mockResolvedValue(null);

    await expect(updateUser(mockedUserId, {})).rejects.toThrow(
      `User with id ${mockedUserId} not found`
    );
  });

  it("should throw an error if there is a problem with the database", async () => {
    User.findById.mockRejectedValue(new Error("Database error"));

    await expect(updateUser("123", {})).rejects.toThrow("Database error");
  });
});
