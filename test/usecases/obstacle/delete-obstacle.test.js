import { afterEach, describe, expect, it, vi } from "vitest";
import { Obstacle } from "../../../src/data/models/obstacle.js";
import { deleteObstacle } from "../../../src/data/usecases/obstacle/delete-obstacle.js";

vi.mock("../../../src/data/models/obstacle.js", () => ({
  Obstacle: {
    findByIdAndDelete: vi.fn()
  }
}));

describe("deleteObstacle", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should delete an obstacle successfully", async () => {
    const id = "123";
    const deletedObstacle = { id: "123", x: 10, y: 20 };

    Obstacle.findByIdAndDelete.mockResolvedValue(deletedObstacle);

    const result = await deleteObstacle(id);

    expect(Obstacle.findByIdAndDelete).toHaveBeenCalledWith(id);
    expect(result).toEqual(deletedObstacle);
  });

  it("should throw an error when deletion fails", async () => {
    const id = "123";

    Obstacle.findByIdAndDelete.mockRejectedValue(
      new Error(`Error deleting obstacle with id: ${id}`)
    );

    await expect(deleteObstacle(id)).rejects.toThrow(
      `Error deleting obstacle with id: ${id}`
    );

    expect(Obstacle.findByIdAndDelete).toHaveBeenCalledWith(id);
  });
});
