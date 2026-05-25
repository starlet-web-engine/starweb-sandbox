import { wasPressed } from "web-engine/input/keyboard.ts";
import type { PlayState } from "./types.ts";
import type { Campaign  } from "../campaign/types.ts";

export function createPlayState(campaign: Campaign): PlayState {
  if (!campaign.levels[0]) throw new Error("Campaign has no levels");
  const state: PlayState = {
    levels: campaign.levels,
    levelIndex: 0
  }
  return state;
}

export function selectLevel(p: PlayState, index: number): void {
  if (!p.levels[index]) throw new Error(`Campaign has no level at index ${index}`);
  p.levelIndex = index;
}

export function updatePlayState(p: PlayState, dt: number): boolean {
  if (wasPressed("Digit1")) return true;

  return false;
}

export function renderPlayState(
  ctx: CanvasRenderingContext2D,
  p: PlayState,
  w: number,
  h: number,
): void {

}
