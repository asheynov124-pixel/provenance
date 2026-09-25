/** Provenance records. Content is separate from presentation.
 * Stable string IDs link works, makers, rooms, visits, and trails.
 * Years: negative = BCE, positive = CE. There is no year 0 in the display layer.
 */

export type LicenseStatus = "CC0" | "Copyrighted" | "Other";

export interface WorkImage {
  web?: string;
  print?: string;
  full?: string;
}

export interface Origin {
  placeLabel: string;
  culture?: string;
  findSpot?: string;
  /** Approximate WGS84. Origin map, not a surveyed find-spot. */
  lat?: number;
  lng?: number;
}

export interface Work {
  id: string;
  accessionNumber: string;
  title: string;
  tombstone: string;
  dateLabel: string;
  dateEarliest: number | null;
  dateLatest: number | null;
  department: string;
  type: string;
  culture: string[];
  technique?: string;
  creditLine?: string;
  shareLicenseStatus: LicenseStatus;
  /** Populated only when shareLicenseStatus is CC0. */
  images: WorkImage | null;
  roomId: string;
  makerIds: string[];
  origin: Origin;
  currentlyOnView: boolean;
  sourceUrl: string;
  hideGraphic?: boolean;
}

export interface Maker {
  id: string;
  name: string;
  role?: string;
  birthYear?: number;
  deathYear?: number;
  biography?: string;
  nationality?: string;
}

export interface Room {
  id: string;
  name: string;
  galleryLabel: string;
  floor: number;
  x: number;
  y: number;
  w: number;
  h: number;
  department?: string;
  hideGraphicDefault: boolean;
}

export interface VisitStop {
  workId: string;
  stoodAt: string;
}

export interface Visit {
  id: string;
  name: string;
  startedAt: string;
  endedAt?: string;
  workIds: string[];
}

export interface Trail {
  visitId: string;
  name: string;
  houseId: string;
  exportedAt: string;
  stops: VisitStop[];
}

export interface House {
  id: string;
  name: string;
  shortName: string;
  attribution: string;
  apiBase?: string;
  swapNote: string;
}

export interface Pack {
  id: string;
  name: string;
}

export interface FloorPack {
  house: House;
  rooms: Room[];
  makers: Maker[];
  works: Work[];
}

export const DEFAULT_PACK_NAME = "See later";
