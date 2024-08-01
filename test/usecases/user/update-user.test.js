import { describe, expect, it, vi } from "vitest";
import { User } from "../../../src/data/models/user.js";
import { updateUser } from "../../../src/data/usecases/user/update-user.js";

vi.mock("../../../src/data/models/user.js");

describe("updateUser", () => {
  it("should update the user if found", async () => {
    const mockUser = { id: "123", name: "John Doe" };
    const changes = { name: "Jane Doe" };
    const updatedUser = { id: "123", name: "Jane Doe" };

    User.findById.mockResolvedValue(mockUser);
    User.findByIdAndUpdate.mockResolvedValue(updatedUser);

    const result = await updateUser("123", changes);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith("123", changes, {
      new: true
    });
    expect(result).toEqual(updatedUser);
  });

  it("should throw an error if the user is not found", async () => {
    User.findById.mockResolvedValue(null);

    await expect(updateUser("123", {})).rejects.toThrow("User not found.");
  });

  it("should throw an error if there is a problem with the database", async () => {
    User.findById.mockRejectedValue(new Error("Database error"));

    await expect(updateUser("123", {})).rejects.toThrow("Database error");
  });
});
