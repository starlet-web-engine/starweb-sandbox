import type { Level } from "../level/types.ts";

/** Inline or file-referenced entry. */
export type CampaignEntry<T> = { data: T } | { path: string };

export interface CampaignData {
  /** Campaign display name */
  name: string;
  /** Levels in play order */
  levels: CampaignEntry<unknown>[];
  /** Audio(s) required for this campaign */
  audio?: unknown;
}

export interface CampaignAudio {
  button?: string;
}

export interface Campaign {
  name: string;
  levels: Level[];
  audio: CampaignAudio;
}
