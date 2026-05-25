import type { Level } from "./types.ts";
import { isObj, num, str, optStr, arr } from "../utils/validate.ts";
import type { AABB } from "web-engine/physics/types.ts";

export function loadLevel(rawLevel: unknown): Level {
  if (!isObj(rawLevel)) throw new Error("Level: not an object");

  const name = optStr(rawLevel, "name", "Level");
  const base = name !== undefined ? { name } : {};

  const kind = str(rawLevel, "kind", "Level");
  if (kind === "physics-stress") {
    const count = num(rawLevel, "count", "Level");
    const rawWalls = arr(rawLevel, "walls", "Level");
    const walls: AABB[] = rawWalls.map((w, i) => {
      if (!isObj(w)) throw new Error(`Level.walls[${i}]: not an object`);
      return {
        x: num(w, "x", `Level.walls[${i}]`),
        y: num(w, "y", `Level.walls[${i}]`),
        w: num(w, "w", `Level.walls[${i}]`),
        h: num(w, "h", `Level.walls[${i}]`),
      };
    });
    return { ...base, kind, count, walls };
  }

  throw new Error(`Level: unknown kind "${kind}"`);
}
