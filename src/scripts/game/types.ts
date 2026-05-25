export type FrameState = { game: "menu-title";    ui: null }
                       | { game: "menu-settings"; ui: null }
                       | { game: "menu-levels";   ui: null }
                       | { game: "level-playing"; ui: null }
                       | { game: "level-paused";  ui: null }
