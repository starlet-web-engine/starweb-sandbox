import { wasPressed     } from "web-engine/input/keyboard.ts";
import type { OBB       } from "web-engine/physics/types.ts";
import { obbVsAabb      } from "web-engine/physics/collision.ts";
import type { PlayState } from "./types.ts";
import type { Campaign  } from "../campaign/types.ts";

function spawnBodies(count: number, w: number, h: number): OBB[] {
  return Array.from({ length: count }, () => ({
    cx:    Math.random() * w,
    cy:    Math.random() * h,
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
    bodies:     [],
    canvasW:    0,
    canvasH:    0
  };
}

export function selectLevel(p: PlayState, index: number): void {
  if (!p.levels[index]) throw new Error(`Campaign has no level at index ${index}`);
  p.levelIndex = index;
  const level = p.levels[index]!;
  if (level.kind === "physics-stress") p.bodies = spawnBodies(level.count, p.canvasW, p.canvasH);
  else p.bodies = [];
}

export function updatePlayState(p: PlayState, dt: number): boolean {
  if (wasPressed("Digit1")) return true;
  const level = p.levels[p.levelIndex];
  if (!level) return false;

  if (level.kind === "physics-stress") {
    for (const b of p.bodies) {
      b.cx += Math.cos(b.angle) * 100 * (dt / 1000);
      b.cy += Math.sin(b.angle) * 100 * (dt / 1000);
      for (const wall of level.walls) {
        const mtv = obbVsAabb(b, wall);
        if (mtv) {
          b.cx += mtv.axis.x * mtv.depth;
          b.cy += mtv.axis.y * mtv.depth;
          b.angle = Math.atan2(-mtv.axis.y, -mtv.axis.x) + (Math.random() - 0.5) * 0.5;
        }
      }
    }
  }
  return false;
}

export function renderPlayState(
  ctx: CanvasRenderingContext2D,
  p: PlayState,
  w: number,
  h: number,
): void {
  const level = p.levels[p.levelIndex];
  if (!level) return;

  if (level.kind === "physics-stress") {
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    for (const wall of level.walls) {
      ctx.strokeRect(wall.x, wall.y, wall.w, wall.h);
    }
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
  if (level.kind === "physics-stress") p.bodies = spawnBodies(level.count, p.canvasW, p.canvasH);
  else p.bodies = [];
}
