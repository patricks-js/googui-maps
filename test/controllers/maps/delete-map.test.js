import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { deleteMap } from "../../../src/data/usecases/map/delete-map.js";
import { deleteMapController } from "../../../src/http/controllers/map/delete-map.js";

vi.mock("../../../src/data/usecases/map/delete-map.js", () => ({
  deleteMap: vi.fn()
}));

describe("deleteMapController", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockRequest = (params) => ({
    params
  });

  const mockReply = () => {
    const reply = {};
    reply.status = vi.fn().mockReturnValue(reply);
    reply.send = vi.fn().mockReturnValue(reply);
    return reply;
  };

  it("should return 204 when the map is successfully deleted", async () => {
    const mapId = "1234";

    deleteMap.mockResolvedValue();

    const request = mockRequest({ id: mapId });
    const reply = mockReply();

    await deleteMapController(request, reply);

    expect(deleteMap).toHaveBeenCalledWith(mapId);
    expect(reply.status).toHaveBeenCalledWith(204);
    expect(reply.send).toHaveBeenCalled();
  });

  it("should return 404 with an error message if the input validation fails", async () => {
    const invalidParams = { id: 1234 }; // id should be a string

    const request = mockRequest(invalidParams);
    const reply = mockReply();

    await deleteMapController(request, reply);

    expect(deleteMap).not.toHaveBeenCalled();
    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith(expect.any(z.ZodError));
  });
});
