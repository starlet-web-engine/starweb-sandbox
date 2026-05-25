import "./style.css";
import { startLoop       } from "web-engine/update.ts";
import { bootstrapGame   } from "./scripts/game/game.ts";
import type { FrameState } from "./scripts/game/types.ts";
import { updateFrame, renderFrame } from "./scripts/game/frame.ts";

const { canvas, ctx, audio } = bootstrapGame();

let frame: FrameState = { game: "menu-title", ui: null };

startLoop(
  (dt) => { frame = updateFrame(canvas, frame, audio, dt); },
  (  ) => { renderFrame(ctx, canvas, frame);    },
  { tickRate: "variable", maxDelta: 250 }
)
