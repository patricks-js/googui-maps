import { BadRequestError, NotFoundError } from "../../../http/errors.js";
import { Maps } from "../../models/map.js";

export async function verifyMap(mapId, startPoint, destinationPoint) {
  const map = await Maps.findById(mapId);

  if (!map) {
    throw new NotFoundError("Map not found");
  }

  if (!verifyIfPointExists(map, startPoint)) {
    throw new BadRequestError("Start point not found");
  }

  if (!verifyIfPointExists(map, destinationPoint)) {
    throw new NotFoundError("Destination point not found");
  }

  if (!map.obstacles) {
    throw new NotFoundError(
      "Map settings do not include obstacles or waypoints"
    );
  }
}

export function verifyIfPointExists(map, position) {
  const isInWidthRange = map.dimensions.width >= position.x;
  const isInHeightRange = map.dimensions.height >= position.y;
  const isPositive = position.x > 0 && position.y > 0;

  return isInWidthRange && isPositive && isInHeightRange;
}
