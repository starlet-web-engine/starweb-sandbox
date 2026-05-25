import type { Level, NormalizedRect   } from "./types.ts";
import { isObj, num, str, optStr, arr } from "../utils/validate.ts";

export function loadLevel(rawLevel: unknown): Level {
  if (!isObj(rawLevel)) throw new Error("Level: not an object");

  const name = optStr(rawLevel, "name", "Level");
  const base = name !== undefined ? { name } : {};

  const kind = str(rawLevel, "kind", "Level");
  if (kind === "physics-stress") {
    const count    = num(rawLevel, "count", "Level");
    const padding  = num(rawLevel, "padding", "Level");
    const rawWalls = arr(rawLevel, "extraWalls", "Level");
    const extraWalls: NormalizedRect[] = rawWalls.map((w, i) => {
      if (!isObj(w)) throw new Error(`Level.extraWalls[${i}]: not an object`);
      return {
        x: num(w, "x", `Level.extraWalls[${i}]`),
        y: num(w, "y", `Level.extraWalls[${i}]`),
        w: num(w, "w", `Level.extraWalls[${i}]`),
        h: num(w, "h", `Level.extraWalls[${i}]`),
      };
    });
    return { ...base, kind, count, padding, extraWalls };
  }

  throw new Error(`Level: unknown kind "${kind}"`);
}
