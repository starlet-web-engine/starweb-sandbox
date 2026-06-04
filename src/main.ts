import "./style.css";
import      { startLoop                } from "web-engine/update.ts";
import type { FrameState               } from "./scripts/game/types.ts";
import      { bootstrapGame            } from "./scripts/game/game.ts";
import      { loadCampaign             } from "./scripts/campaign/load.ts";
import      { createPlayState          } from "./scripts/game/play.ts";
import      { updateFrame, renderFrame } from "./scripts/game/frame.ts";

const { canvas, ctx, audio } = bootstrapGame();

const BASE_URL = import.meta.env.BASE_URL;
await audio.registerSound("button", "audio/ui/button.wav", BASE_URL);
await audio.registerSound("win",    "audio/ui/win.wav",    BASE_URL);

const campaign = await loadCampaign("test", audio);
const playState = createPlayState(campaign, 1);
let frame: FrameState = { game: "menu-title", ui: null };

startLoop(
  (dt) => { frame = updateFrame(canvas, frame, playState, audio, dt); },
  (  ) => { renderFrame(ctx, canvas, frame, playState);               },
  { tickRate: "variable", maxDelta: 50, pauseOnHidden: true           }
)
