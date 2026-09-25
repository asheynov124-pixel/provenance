import type { Trail, Visit, VisitStop } from "../data/types";

/** Export a visit as an ordered trail. Order follows visit.workIds, never stoodAt. */
export function exportTrail(
  visit: Visit,
  houseId: string,
  stoodAtByWorkId: Record<string, string> = {},
): Trail {
  const stops: VisitStop[] = visit.workIds.map((workId) => ({
    workId,
    stoodAt: stoodAtByWorkId[workId] ?? visit.startedAt,
  }));
  return {
    visitId: visit.id,
    name: visit.name,
    houseId,
    exportedAt: new Date().toISOString(),
    stops,
  };
}

export function downloadTrail(trail: Trail): void {
  const blob = new Blob([JSON.stringify(trail, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const slug = trail.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  link.download = `${slug || "trail"}.json`;
  link.click();
  URL.revokeObjectURL(url);
}
