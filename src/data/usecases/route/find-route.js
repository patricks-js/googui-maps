import { BadRequestError, NotFoundError } from "../../../http/errors.js";
import { Maps } from "../../models/map.js";
import { verifyIfPointExists } from "../maps/verify-map.js";

async function findBestRoute(map, startPoint, endPoint) {
  if (
    !map ||
    !verifyIfPointExists(map, startPoint) ||
    !verifyIfPointExists(map, endPoint)
  ) {
    throw new BadRequestError("Invalid map or points.");
  }

  const heuristic = (pointA, pointB) => {
    return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y);
  };

  const openSet = new Set([JSON.stringify(startPoint)]);
  const closedSet = new Set();

  const gScore = new Map();
  gScore.set(JSON.stringify(startPoint), 0);

  const fScore = new Map();
  fScore.set(JSON.stringify(startPoint), heuristic(startPoint, endPoint));

  const cameFrom = new Map();

  while (openSet.size > 0) {
    const currentStr = Array.from(openSet).reduce((lowest, pointStr) => {
      return (fScore.get(lowest) || Number.POSITIVE_INFINITY) <
        (fScore.get(pointStr) || Number.POSITIVE_INFINITY)
        ? lowest
        : pointStr;
    });

    const current = JSON.parse(currentStr);

    if (current.x === endPoint.x && current.y === endPoint.y) {
      return { optimal_path: reconstructPath(cameFrom, current) };
    }

    openSet.delete(currentStr);
    closedSet.add(currentStr);

    const neighbors = getNeighbors(map, current);
    for (const neighbor of neighbors) {
      const neighborStr = JSON.stringify(neighbor);
      if (closedSet.has(neighborStr)) {
        continue;
      }

      const tentativeGScore =
        gScore.get(currentStr) + distance(current, neighbor);

      if (!openSet.has(neighborStr)) {
        openSet.add(neighborStr);
      } else if (
        tentativeGScore >= (gScore.get(neighborStr) || Number.POSITIVE_INFINITY)
      ) {
        continue;
      }

      cameFrom.set(neighborStr, current);
      gScore.set(neighborStr, tentativeGScore);
      fScore.set(neighborStr, tentativeGScore + heuristic(neighbor, endPoint));
    }
  }

  throw new NotFoundError("No path found");
}

function reconstructPath(cameFrom, current) {
  const totalPath = [current];
  let currentStr = JSON.stringify(current);
  let currentPath = current;
  while (cameFrom.has(currentStr)) {
    currentPath = cameFrom.get(currentStr);
    currentStr = JSON.stringify(currentPath);
    totalPath.unshift(currentPath);
  }
  return totalPath;
}

function getNeighbors(map, point) {
  const neighbors = [];
  const directions = [
    { x: 1, y: 0 }, //right
    { x: -1, y: 0 }, //left
    { x: 0, y: 1 }, // up
    { x: 0, y: -1 }, // down
    { x: 1, y: 1 }, //right up diagonal
    { x: 1, y: -1 }, //right down diagonal
    { x: -1, y: 1 }, //left up diagonal
    { x: -1, y: -1 } //left down diagonal
  ];
  for (const dir of directions) {
    const neighbor = { x: point.x + dir.x, y: point.y + dir.y };
    if (verifyIfPointExists(map, neighbor) && !isObstacle(map, neighbor)) {
      neighbors.push(neighbor);
    }
  }
  return neighbors;
}

function distance(pointA, pointB) {
  return 1;
}

function isObstacle(map, point) {
  return map.obstacles.some(
    (obstacle) => obstacle.x === point.x && obstacle.y === point.y
  );
}

export async function findBestRouteFromJSON(inputJSON) {
  const { map_id, start_point, end_point } = inputJSON;
  const map = await Maps.findById(map_id);

  return await findBestRoute(map, start_point, end_point);
}
