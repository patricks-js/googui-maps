import { Maps } from "../../models/map.js";

export async function verifyMap(mapId, startPoint, destinationPoint) {
  const map = await Maps.findById(mapId);

  if (!map) {
    throw new Error("Map not found");
  }

  if (!verifyIfPointExists(map, startPoint)) {
    throw new Error("Start point not found");
  }

  if (!verifyIfPointExists(map, destinationPoint)) {
    throw new Error("Destination point not found");
  }
}

function verifyIfPointExists(map, position) {
  const widthVerify = map.dimensions.width >= position.x;
  const heightVerify = map.dimensions.height >= position.y;
  const isPositive = position.x > 0 && position.y > 0;

  return widthVerify && isPositive && heightVerify;
}
