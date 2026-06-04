interface LevelBase {
  name?: string;
}

export interface NormalizedRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type Level = LevelBase & {
  kind:        "physics-stress";
  count:       number;
  padding:     number;
  shape:       "rect" | "circle";
  extraWalls?: NormalizedRect[];
}
