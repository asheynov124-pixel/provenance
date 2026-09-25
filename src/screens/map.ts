import { DEFAULT_PACK_NAME } from "../data/types";

export { DEFAULT_PACK_NAME };

export const ROUTES = {
  onView: "/",
  atlasGallery: "/atlas/gallery",
  atlasOrigin: "/atlas/origin",
  work: "/works/:id",
  visits: "/visits",
  visit: "/visits/:id",
  activity: "/activity",
  search: "/search",
} as const;

export const TABS = [
  { id: "on-view", label: "On view", to: "/" },
  { id: "atlas", label: "Atlas", to: "/atlas/gallery" },
  { id: "visits", label: "Visits", to: "/visits" },
  { id: "activity", label: "Activity", to: "/activity" },
  { id: "search", label: "Search", to: "/search" },
] as const;

export const RAILS = [
  { id: "on-view-now", label: "On view now" },
  { id: "because-you-stood-here", label: "Because you stood here" },
  { id: "canon-of-this-house", label: "Canon of this house" },
] as const;

export const ATLAS_MODES = [
  { id: "gallery", label: "Gallery", to: "/atlas/gallery" },
  { id: "origin", label: "Origin", to: "/atlas/origin" },
] as const;

export const CANON_IDS = ["157016", "130360", "127571", "141639", "160885", "135299"] as const;

export function workPath(id: string): string {
  return `/works/${id}`;
}
