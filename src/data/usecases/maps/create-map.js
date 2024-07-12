import { Maps } from "../../models/map.js";

export async function createMap(map) {
  const existingMap = await Maps.findOne({ name: map.name });

  if (!existingMap) {
    return await Maps.create(map);
  }

  throw new Error("Map already exists");
}
