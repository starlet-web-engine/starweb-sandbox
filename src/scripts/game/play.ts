import { wasPressed     } from "web-engine/input/keyboard.ts";
import type { OBB       } from "web-engine/physics/types.ts";
import { obbVsAabb      } from "web-engine/physics/collision.ts";
import type { PlayState } from "./types.ts";
import type { Campaign  } from "../campaign/types.ts";
import type { Level     } from "../level/types.ts";
import { buildWalls     } from "../level/build.ts";

function spawnBodies(
  count: number,
  level: Level & { kind: "physics-stress" },
  cw: number,
  ch: number
): OBB[] {
  const pad = level.padding;
  const px = cw * pad + 10;
  const py = ch * pad + 10;
  return Array.from({ length: count }, () => ({
    cx:    px + Math.random() * (cw - px * 2),
    cy:    py + Math.random() * (ch - py * 2),
    hw:    10 + Math.random() * 20,
    hh:    10 + Math.random() * 20,
    angle: Math.random() * Math.PI * 2,
  }));
}

export function createPlayState(campaign: Campaign, initialVolume: number): PlayState {
  if (!campaign.levels[0]) throw new Error("Campaign has no levels");
  return {
    levels:     campaign.levels,
    levelIndex: 0,
    volState:   { dragging: false, value: initialVolume },
    canvasW:    0,
    canvasH:    0,
    bodies:     [],
    walls:      []
  };
}

export function selectLevel(p: PlayState, index: number): void {
  if (!p.levels[index]) throw new Error(`Campaign has no level at index ${index}`);
  p.levelIndex = index;
  const level = p.levels[index]!;
  if (level.kind === "physics-stress") {
    p.walls  = buildWalls(level, p.canvasW, p.canvasH);
    p.bodies = spawnBodies(level.count, level, p.canvasW, p.canvasH);
  } else {
    p.walls  = [];
    p.bodies = [];
  }
}

export function updatePlayState(p: PlayState, dt: number): boolean {
  if (wasPressed("Digit1")) return true;
  const level = p.levels[p.levelIndex];
  if (!level) return false;

  if (level.kind === "physics-stress") {
    for (const b of p.bodies) {
      b.cx += Math.cos(b.angle) * 100 * (dt / 1000);
      b.cy += Math.sin(b.angle) * 100 * (dt / 1000);
      for (const wall of p.walls  ) {
        const mtv = obbVsAabb(b, wall);
        if (mtv) {
          b.cx += mtv.axis.x * mtv.depth;
          b.cy += mtv.axis.y * mtv.depth;

          const dot = Math.cos(b.angle) * mtv.axis.x + Math.sin(b.angle) * mtv.axis.y;
          const rx = Math.cos(b.angle) - 2 * dot * mtv.axis.x;
          const ry = Math.sin(b.angle) - 2 * dot * mtv.axis.y;
          b.angle = Math.atan2(ry, rx);
        }
      }
      if (b.cx < 0 || b.cx > p.canvasW || b.cy < 0 || b.cy > p.canvasH) {
        b.cx = p.canvasW / 2;
        b.cy = p.canvasH / 2;
      }
    }
  }
  return false;
}

export function renderPlayState(
  ctx: CanvasRenderingContext2D,
  p: PlayState,
  _w: number,
  _h: number,
): void {
  const level = p.levels[p.levelIndex];
  if (!level) return;

  if (level.kind === "physics-stress") {
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    for (const wall of p.walls)
      ctx.strokeRect(wall.cx - wall.hw, wall.cy - wall.hh, wall.hw * 2, wall.hh * 2);
    ctx.strokeStyle = "#0f0";
    for (const b of p.bodies) {
      ctx.save();
      ctx.translate(b.cx, b.cy);
      ctx.rotate(b.angle);
      ctx.strokeRect(-b.hw, -b.hh, b.hw * 2, b.hh * 2);
      ctx.restore();
    }
  }
}

export function resetPlayState(p: PlayState): void {
  const level = p.levels[p.levelIndex];
  if (!level) throw new Error(`resetPlayState: no level at index ${p.levelIndex}`);
  if (level.kind === "physics-stress") {
    p.walls  = buildWalls(level, p.canvasW, p.canvasH);
    p.bodies = spawnBodies(level.count, level, p.canvasW, p.canvasH);
  } else {
    p.walls  = [];
    p.bodies = [];
  }
}
