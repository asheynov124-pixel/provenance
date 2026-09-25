import type { Work } from "../data/types";

/** In-app thumbs are CC0-only. */
export function thumbUrl(work: Work): string | null {
  if (work.shareLicenseStatus !== "CC0") return null;
  return work.images?.web ?? null;
}
