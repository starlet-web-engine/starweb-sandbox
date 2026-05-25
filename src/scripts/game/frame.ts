import { wasPressed      } from "web-engine/input/keyboard.ts";
import type { Audio      } from "web-engine/audio.ts";
import type { FrameState } from "./types.ts";
import { transition      } from "./transition.ts";

export function updateFrame(
  canvas: HTMLCanvasElement,
  frame: FrameState,
  audio: Audio,
  dt: number
): FrameState {
  if (wasPressed("Escape")) {
    if (frame.game === "level-playing") return transition({ game: "level-paused",  ui: null }, audio);
    if (frame.game === "level-paused" ) return transition({ game: "level-playing", ui: null }, audio);
  }

  return frame;
}

export function renderFrame(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  frame: FrameState
): void {
  const { width: w, height: h } = canvas;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
}
