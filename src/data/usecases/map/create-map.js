import { BadRequestError } from "../../../http/errors.js";
import { Maps } from "../../models/map.js";

export async function createMap(map) {
  const existingMap = await Maps.findOne({ name: map.name });

  if (existingMap) {
    throw new BadRequestError("Map already exists");
  }

  return Maps.create(map);
}
