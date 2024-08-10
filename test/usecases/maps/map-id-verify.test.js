import { describe, expect, it } from "vitest";
import { verifyMapId } from "../../../src/data/usecases/map/map-id-verify.js";

describe("verifyMapId", () => {
  it("should return a valid message for a correct map ID format", () => {
    const validId = "66b6774920ed1fbdf7609d13";
    const result = verifyMapId(validId);
    expect(result).toEqual({
      message: `O formato do ID: ${validId} do mapa é válido.`
    });
  });

  it("should return a valid message for another correct map ID format", () => {
    const anotherValidId = "5f8d04b4b54764421b7156aa";
    const result = verifyMapId(anotherValidId);
    expect(result).toEqual({
      message: `O formato do ID: ${anotherValidId} do mapa é válido.`
    });
  });
});
