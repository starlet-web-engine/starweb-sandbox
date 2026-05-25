import type { Level } from "../level/types.ts";
import type {
  SliderState,
  TitleMenuState,
  SettingsMenuState,
  LevelSelectState
} from "../ui/types.ts";

export interface PlayState {
  levels: Level[];
  levelIndex: number;
  volState: SliderState;
}

export type FrameState = { game: "menu-title";    ui: TitleMenuState    | null }
                       | { game: "menu-settings"; ui: SettingsMenuState | null }
                       | { game: "menu-levels";   ui: LevelSelectState  | null }
                    /* | { game: "level-playing"; ui:                     null }
                       | { game: "level-paused";  ui:                     null }
                       | { game: "level=won";     ui:                     null }*/
