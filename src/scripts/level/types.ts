import type { AABB } from "web-engine/physics/types.ts";

interface LevelBase {
  name?: string;
}

export type Level = LevelBase & { kind: "physics-stress"; count: number; walls: AABB[] }
