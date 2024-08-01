// test/services/user/findUser.test.js
import { describe, expect, it, vi } from "vitest";
import { User } from "../../../src/data/models/user.js";
import { findUser } from "../../../src/data/usecases/user/find-user.js";

vi.mock("../../../src/data/models/user.js");

describe("findUser", () => {
  it("should return the user if found", async () => {
    const mockUser = { id: "123", name: "John Doe" };
    User.findById.mockResolvedValue(mockUser);

    const result = await findUser("123");

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockUser);
  });

  it("should throw an error if the user is not found", async () => {
    User.findById.mockResolvedValue(null);

    await expect(findUser("123")).rejects.toThrow("User not found.");
  });

  it("should throw an error if there is a problem with the database", async () => {
    User.findById.mockRejectedValue(new Error("Database error"));

    await expect(findUser("123")).rejects.toThrow("Database error");
  });
});
