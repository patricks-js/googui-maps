import { Maps } from "../../models/map.js";

export function verifyMapId(mapId) {
  if (!mapId) {
    return { error: "Formato de ID do mapa inválido." };
  }

  return { message: "O formato do ID do mapa é válido." };
}
