import type { Level } from "./types.ts";
import { isObj, optStr      } from "../utils/validate.ts";

export function loadLevel(rawLevel: unknown): Level {
  if (!isObj(rawLevel)) throw new Error("Level: not an object");

  const name = optStr(rawLevel, "name", "Level");

  const level: Level = {};
  if (name !== undefined) level.name = name;
  return level;
}
