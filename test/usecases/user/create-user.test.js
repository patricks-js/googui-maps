import { beforeEach, describe, expect, it, vi } from "vitest";
import { User } from "../../../src/data/models/user.js";
import { createUser } from "../../../src/data/usecases/user/create-user.js";

vi.mock("../../../src/data/models/user.js");

describe("createUser", () => {
  const mockUser = {
    email: "test@example.com",
    username: "testuser",
    password: "password123"
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a new user if no user with the same email or username exists", async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue(mockUser);

    const result = await createUser(mockUser);

    expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
    expect(User.findOne).toHaveBeenCalledWith({ username: mockUser.username });
    expect(User.create).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });

  it("should throw an error if a user with the same email and username exists", async () => {
    User.findOne.mockResolvedValue(mockUser);

    await expect(createUser(mockUser)).rejects.toThrow("Error creating user.");

    expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
    expect(User.findOne).toHaveBeenCalledWith({ username: mockUser.username });
    expect(User.create).not.toHaveBeenCalled();
  });

  it("should throw an error if there is an issue creating the user", async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockRejectedValue(new Error("Error creating user"));

    await expect(createUser(mockUser)).rejects.toThrow("Error creating user");

    expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
    expect(User.findOne).toHaveBeenCalledWith({ username: mockUser.username });
    expect(User.create).toHaveBeenCalledWith(mockUser);
  });
});
