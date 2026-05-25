import type { AABB  } from "web-engine/physics/types.ts";
import type { Level } from "./types.ts";

export function buildWalls(level: Level, cw: number, ch: number): AABB[] {
  if (level.kind !== "physics-stress") return [];
  const pad = level.padding;
  const px = cw * pad;
  const py = ch * pad;
  const iw = cw - px * 2;
  const ih = ch - py * 2;
  const t = 4;
  const border: AABB[] = [
    { x: px,        y: py,        w: iw, h: t  },
    { x: px,        y: py+ih-t,   w: iw, h: t  },
    { x: px,        y: py,        w: t,  h: ih },
    { x: px+iw-t,   y: py,        w: t,  h: ih },
  ];
  const extras = level.extraWalls.map(e => ({
    x: e.x * cw, y: e.y * ch, w: e.w * cw, h: e.h * ch,
  }));
  return [...border, ...extras];
}
